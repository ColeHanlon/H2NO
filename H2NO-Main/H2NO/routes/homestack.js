import { createStackNavigator} from "react-navigation-stack";
import {createAppContainer} from "react-navigation";
import SmartHomePage from "../components/smart_home_page";
import Thermostat from "../components/smart_home_thermostat";
import LoginScreen from "../components/login_page";
import RegistrationPage from "../components/registration_page";
import SocialPage from "../components/social_page";
import WaterPage from "../components/water_page";
import MapPage from "../components/map_page";
import NavPage from "../components/nav_page";
import RecyclePage from "../components/RecyclePage";
import FanPage from "../components/smart_home_fan";
import HeaterPage from "../components/smart_home_heater"
import AirCoolerPage from "../components/smart_home_aircooler"
import SprinklersPage from "../components/smart_home_sprinklers";
import BlindsPage from "../components/smart_home_blinds";
import LightbulbPage from "../components/smart_home_lightbulb";
import AddLight from "../components/smart_home_add_light";
import EditLight from "../components/edit_light";
import ForgotPasswordPage from "../components/forgot_password_page";
import EditWaterPage from '../components/edit_water';
import Friends from '../components/add_friends';
import EditProfilePage from '../components/edit_profile';
import Recycle101Page from "../components/recycling101_page";
import PlasticPage from "../components/plastics_page";
import AluminumPage from "../components/aluminum_page";
import PaperPage from "../components/paper_page";
import GlassPage from "../components/glass_page";
import ElectronicsPage from "../components/electronics_page";
import CountyContactPage from "../components/recycle_contact_page";
import CreateNewPostPage from '../components/create_new_post';
import RecycleItem from "../components/recycle_item_page";
import GoalsPage from "../components/goals";

const components = {
    Login: {
        screen: LoginScreen
    },
    Registration: {
        screen: RegistrationPage
    },
    NavPage: {
        screen: NavPage
    },
    SmartHome: {
        screen: SmartHomePage
    },
    Thermostat: {
        screen: Thermostat
    },    
    Social:{
        screen: SocialPage
    },
    CreateNewPost: {
        screen: CreateNewPostPage
    },
    WaterData: {
        screen: WaterPage
    },
    WaterMap: {
        screen: MapPage
    },
    "Recycle Right": {
        screen: RecyclePage
    },
    Fan: {
        screen: FanPage
    },
    Heater: {
        screen: HeaterPage
    },
    AirCooler: {
        screen: AirCoolerPage
    },
    Sprinklers: {
        screen: SprinklersPage
    },
    Blinds: {
        screen: BlindsPage
    },
    Lightbulb: {
        screen: LightbulbPage
    },    AddLight: {
        screen: AddLight
    },
    EditLight: {
        screen: EditLight      
    },
    EditWaterUse: {
        screen: EditWaterPage
    },
    EditProfile: {
        screen: EditProfilePage
    },
    Friends : {
        screen: Friends
    },
    ForgotPassword:{
        screen: ForgotPasswordPage
    },
    "Recycling 101": {
        screen: Recycle101Page
    },
    Plastics: {
        screen: PlasticPage
    },
    Aluminum: {
        screen: AluminumPage
    },
    "Paper & Cardboard": {
        screen: PaperPage
    },
    Glass: {
        screen: GlassPage
    },
    Electronics: {
        screen: ElectronicsPage
    },
    "County Contacts" : {
        screen: CountyContactPage
    },
    "Recycle Item": {
        screen: RecycleItem
    },
    Goals:
    {
        screen: GoalsPage
    }
}

const homestack = createStackNavigator(components);

export default createAppContainer(homestack);
