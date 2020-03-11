import React from 'react'
import { View, Button,TextInput,  FlatList ,Text,  StyleSheet , ActivityIndicator} from 'react-native'
import films from '../Helpers/filmsData'
import FilmItem from './FilmItem'
import {getFilmsBySearchedText} from '../API/TMDBApi'

class Search extends React.Component {
    constructor(props){
      super(props)
      this.state={
        films: [],
        isLoading: false
      }
      this.searchedText = ""
      this.page = 0,
      this.totalPages = 0

    }
   handleChangeText = (text) => {
          this.searchedText = text
   }
   _searchFilms = () => {
     this.page = 0
     this.totalPages = 0
     this.setState({
         films: []
     },
      this._loadFilms()
   )

   }

  _loadFilms = () => {
    if(this.searchedText.length > 0) {
      this.setState({isLoading: true})

      getFilmsBySearchedText(this.searchedText, this.page+1).then((data) => {
        this.page = data.page,
        this.totalPages = data.totalPages
        this.setState({
          films: [...this.state.films, ...data.results],
          isLoading: false,
        })

      }).catch(error => console.log(error));
    }
  }
  _displayLoading = () => {
  if(this.state.isLoading){
    return(
      <View style={styles.loading_container}>
           <ActivityIndicator size="large" />
      </View>
     )
  }

  }

  _navigateToFilmDetail = (id) => {
    this.props.navigation.navigate("FilmDetail", {idFilm: id})
  }

    render() {
      return(
        <View style={styles.main_container}>
             <TextInput style={styles.input}  placeholder="Title Of Film"
                onChangeText={(text) => this.handleChangeText(text)}
                onSubmitEditing={() => this._searchFilms()}
             />
             <Button title="Search" onPress={() => this._searchFilms()} />
             <FlatList
                 data = {this.state.films}
                 renderItem={({item}) => <FilmItem 
                  film={item}
                  navigate={this._navigateToFilmDetail}
                  />}
                 keyExtractor = {(item) => item.id.toString()}
                 onEndReachedThreshold={0.5}
                 onEndReached={() => {
                   if(this.page < this.totalPages){
                        this._loadFilms()
                   }
                 }}
             />
             {this._displayLoading()}
        </View>
      )
    }

}


const styles = StyleSheet.create({
    main_container: {
      flex: 1
    },
    input: {
      marginLeft: 5,
      marginRight: 5,
      height: 50,
      paddingLeft: 1

    },
    loading_container: {
      position: 'absolute',
      left: 0,
      right: 0,
      top: 100,
      bottom: 0,
      alignItems: 'center',
      justifyContent: 'center'
    }
})

export default Search
