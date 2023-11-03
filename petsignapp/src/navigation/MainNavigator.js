import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons, MaterialIcons, Feather } from "@expo/vector-icons";

import FeedScreen from "../screens/FeedScreen";
import FindScreen from "../screens/FindScreen";
import ProfileScreen from "../screens/ProfileScreen";

//Internal screen
import ReportScreen from "../screens/ReportScreen";
import LocationScreen from "../screens/LocationScreen";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const TabNavigator = () => {
    return (
        <Tab.Navigator>
            <Tab.Screen
                name="¿Los has visto?"
                component={FeedScreen}
                options={{
                    tabBarLabel: "Feed",
                    tabBarIcon: ({ color, size }) => (
                        <MaterialIcons name="pets" size={24} color="black" />
                    ),
                }}
            />
            <Tab.Screen
                name="Mira cerca de ti!"
                component={FindScreen}
                options={{
                    tabBarLabel: "Find out",
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons
                            name="location-outline"
                            size={24}
                            color="black"
                        />
                    ),
                }}
            />
            <Tab.Screen
                name="Tu perfil"
                component={ProfileScreen}
                options={{
                    tabBarLabel: "Profile",
                    tabBarIcon: ({ color, size }) => (
                        <Feather name="user" size={24} color="black" />
                    ),
                }}
            />
        </Tab.Navigator>
    );
};

const MainNavigator = (props) => {
    return (
        <Stack.Navigator initialRouteName="Home">
            <Stack.Screen
                name="Home"
                component={TabNavigator}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name="ReportScreen"
                component={ReportScreen}
                options={{
                    title: "¡Reportar mascota!",
                }}
            />
            <Stack.Screen
                name="LocationSelection"
                component={LocationScreen}
                options={{
                    title: "¡Selecciona la ultima ubicación de tu mascota!",
                }}
            />
        </Stack.Navigator>
    );
};

export default MainNavigator;
