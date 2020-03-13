import React from 'react'
import { StyleSheet, View, Text, Image, ActivityIndicator } from 'react-native'
import { getFilmDetailFromApi, getImageFromApi } from '../API/TMDBApi'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler'
import moment from 'moment'
import numeral from 'numeral'
import { connect } from 'react-redux'
class FilmDetail extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            film: {},
            isLoading: false
        }
    }


componentDidMount() {
    this.setState({
        isLoading: true
    })
    getFilmDetailFromApi(this.props.navigation.state.params.idFilm)
                    .then((data) =>{
                        this.setState({
                            film: data,
                            isLoading: false
                        })
                    })
                     .catch((error) => console.log(error))

     
}


_toggleFavorite () {
 
    this.props.dispatch( { type: 'TOGGLE_FAVORITE', value: this.state.film})
}

_displayImage = () => {
    let source = require('../Images/ic_favorite_border.png')
    if(this.props.favoritesFilm.findIndex((item) => item.id === this.state.film.id) == -1){
        source = require('../Images/ic_favorite.png')  
    }

    return(
        <Image 
        style={styles.icone}
            source={source}
        />
    )
}
_displayLoading(){
    if(this.state.isLoading){
        return(
            <View style={styles.loading_container}>
                 <ActivityIndicator  size="large"/>
            </View>
        )
    }
}
_displayFilm(){
    const {title, backdrop_path, overview, release_date, vote_average, vote_count, budget, genres, production_companies} = this.state.film
    return(
        <ScrollView style={styles.main_container}>
                <Image style={styles.image_style} source={{uri: getImageFromApi(backdrop_path)}} />
                <Text style={styles.title_style}>{title}</Text>
                <TouchableOpacity
                   style={styles.icone_container}
                   onPress={() => this._toggleFavorite()}
                >
                 {this._displayImage()}

                </TouchableOpacity>
                <Text style={styles.overview}>{overview}</Text>
                <Text style={styles.default_text}>Sorti le {moment(release_date).format('DD/MM/YYYY')}</Text>
                <Text style={styles.default_text}>Note: {vote_average}/10</Text>
                <Text style={styles.default_text}>Nombre de votes: {vote_count}</Text>
                <Text style={styles.default_text}>Budget: {numeral(budget).format('0,0[.]00 $')}</Text>
                <Text style={styles.default_text}>Genre(s): {genres && genres.map((item) =>item.name).join(" / ")}</Text>
                <Text style={styles.default_text}>Companie(s): {production_companies && production_companies.map((item) =>item.name).join(" / ")}</Text>
                            
            </ScrollView>
    )
}

     
    render() {
        
        console.log(this.state.film)
        if(this.state.film!=undefined ){
            return(
                <View style={styles.main_container}>
                {this._displayLoading()}
                {this._displayFilm()}
                </View>
            )
         
        }
    }
}

const styles = StyleSheet.create({
    main_container: {
        flex: 1
    },
    image_style: {
        height: 169,
        margin: 5
    },
    title_style: {
        fontWeight: 'bold',
        fontSize: 35,
        flex: 1,
        flexWrap: 'wrap',
        marginLeft: 5,
        marginRight: 5,
        marginTop: 10,
        marginBottom: 10,
        color: '#000000',
        textAlign: 'center'
    },
    overview: {
        fontStyle: 'italic',
        color: '#666666',
        margin: 5,
        marginBottom: 15
    
    },
    date: {
        marginTop: 5
    },
    default_text: {
        marginLeft: 5,
        marginRight: 5,
        marginTop: 5
    },
    loading_container: {
        position: "absolute",
        top: 100,
        right: 0,
        bottom: 0,
        left: 0
    },
    icone_container: {
        alignItems:'center',
        justifyContent:'center'
    },
    icone: {
        width: 40,
        height: 40
    }
})

const mapStateToProps = (state) => {
    return{
        favoritesFilm: state.favoritesFilm
    }
}

export default connect(mapStateToProps)(FilmDetail)