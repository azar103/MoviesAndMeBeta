// Navigation/Navigations.js
import React from 'react'
import { StyleSheet, Image } from 'react-native'
import {   createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import Search from '../Components/Search'
import FilmDetail from '../Components/FilmDetail'
import FavoritesFilm from '../Components/FavoritesFilm'
import { createBottomTabNavigator } from 'react-navigation-tabs'




const SearchStackNavigator = createStackNavigator({
  Search: {
    screen: Search,
    navigationOptions: {
      title: 'Rechercher'
    }
  },
  FilmDetail: {
    screen: FilmDetail
  }
})

const FavoritesStackNavigator = createStackNavigator({
  FavoritesFilm: {
    screen: FavoritesFilm,
    navigationOptions: {
      title: 'Favoris'
    }
  },
  FilmDetail: {
    screen: FilmDetail
  }
})



const MoviesTabNavigator = createBottomTabNavigator(
  {
    Search: {
      screen: SearchStackNavigator,
      navigationOptions: {
        tabBarIcon: () => {
          return <Image
            source={require('../Images/ic_search.png')}
            style={styles.icon}/>
        }
      }
    },
    FavoritesFilm: {
      screen: FavoritesStackNavigator,
      navigationOptions: {
        tabBarIcon: () => {
          return <Image
            source={require('../Images/ic_favorite.png')}
            style={styles.icon}/>
        }
      }
    }
  },
  {
      tabBarOptions: {
          activeBackgroundColor:'#DDDDDD',
          inactiveBackgroundColor:'#FFFFFF',
          showLabel:false,
          showIcon:true
      }
  }
)

const styles = StyleSheet.create({
  icon: {
    width: 30,
    height: 30
  }

})

export default createAppContainer(MoviesTabNavigator)