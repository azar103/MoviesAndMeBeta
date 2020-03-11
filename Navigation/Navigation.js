import { createStackNavigator } from 'react-navigation-stack'
import Search from '../Components/Search'
import FilmDetail from '../Components/FilmDetail'
import { createAppContainer } from 'react-navigation'
const SearchStackNavigator =  createStackNavigator({
    Search:{
        screen: Search,
        navigationOptions: {
            title: 'Search'
        }
    },
    FilmDetail: {
        screen: FilmDetail,
        navigationOptions: {
            title: ''
        }
    }
})


export default createAppContainer(SearchStackNavigator)

