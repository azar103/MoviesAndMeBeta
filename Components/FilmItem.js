import React from 'react'
import {StyleSheet, View, Text, Image } from 'react-native'
import { getImageFromApi } from '../API/TMDBApi'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { connect } from 'react-redux'
class FilmItem extends React.Component {
  constructor(props){
    super(props)
  }



_displayImage(){
  if(this.props.isFavoriteFilm){
    return(

    <Image 
        style={styles.icone}
        source={require('../Images/ic_favorite_border.png')}
    />
   
    )
  }
}


  render() {
    const {id, vote_average, title, poster_path, overview, release_date } = this.props.film
    return(
         <TouchableOpacity style={styles.main_container}
            onPress={() => this.props.navigate(id)}
         
         >
               <Image  style={styles.image_style} source={{uri: getImageFromApi(poster_path)}}/>
               <View style={styles.view_content}>
                     <View style={styles.view_header}>
                        {this._displayImage()}
                        <Text style={styles.title_style}>{title}</Text>
                        <Text style={styles.vote_average_style}>{vote_average}</Text>
                     </View>
                     <View style={styles.view_description}>
                        <Text style={styles.description_text_style}
                             numberOfLines={6}
                        >{overview}</Text>
                     </View>
                     <View style={styles.view_date}>
                       <Text style={styles.date_style}>Sorti le {release_date}</Text>
                     </View>
               </View>
         </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
     main_container: {
       flexDirection: 'row',
       height: 190
     },
     image_style: {
       backgroundColor: '#808080',
       width: 120,
       height: 180,
       margin: 5
     },
     view_content: {
       flex: 1,
       margin: 5
     },
     view_header: {
       flex:3,
       flexDirection:'row'
     },
     title_style: {
       flex: 1,
       fontWeight: 'bold',
       fontSize: 20,
       flexWrap: 'wrap',
       paddingRight: 5
     },
     vote_average_style: {
       color: '#666666',
       fontWeight: 'bold',
       fontSize: 26
     },
     view_description: {
       flex: 7
     },
     description_text_style: {
       color: '#666666',
       fontStyle: 'italic'
     },
     view_date: {
       flex: 1,
       alignItems: 'flex-end'
     },
     date_style: {
       color: '#868686',
       marginRight: 5,
       fontSize: 14,
       fontWeight:'bold',
     },
     icone: {
       width: 30,
       height: 30,
       marginRight: 5
     }
})





export default FilmItem