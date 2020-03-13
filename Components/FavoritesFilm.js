import React from 'react'
import { View, StyleSheet, Text } from 'react-native'
import { FlatList } from 'react-native-gesture-handler'
import { connect } from 'react-redux'
import FilmItem from './FilmItem'

class FavoritesFilm extends React.Component {
    constructor(props){
        super(props)
    }
    _navigateToFilmDetail = (id) => {
        this.props.navigation.navigate("FilmDetail", {idFilm: id})
     }

    render() {
        return(
            <View style={styles.main_container}>
                  <FlatList 
                     data={this.props.favoritesFilm}
                     renderItem={({item}) => <FilmItem 
                     film={item}
                     isFavoriteFilm={(this.props.favoritesFilm.findIndex((film) => film.id === item.id ) !== -1 ? true: false)}
                     navigate={this._navigateToFilmDetail}
                     />}
                  />
            </View>
        )
    }
    
}

const styles = StyleSheet.create({
      main_container: {
          flex: 1
      }
})

const mapStateToProps = (state) => {
    return{
        favoritesFilm: state.favoritesFilm
    }
}


export default connect(mapStateToProps)(FavoritesFilm)