import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Home } from './Home';
import { MyCards } from './MyCards';
import { colors } from '../constants/colors';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { HomeSVG } from '../assets/SVGs/HomeSVG';
import { CardSVG } from '../assets/SVGs/CardSVG';
import { AnimatedWrapper } from '../components/AnimatedWrapper';
import { gradientColors } from '../constants/gradientColors';
import { AppContext } from '../modules/context';
import { ActionsTypes } from '../constants/ActionsTypes';

const Tab = createBottomTabNavigator();

const AnimatedHome = () => (
  <AnimatedWrapper>
    <Home />
  </AnimatedWrapper>
);

const AnimatedMyCards = () => (
  <AnimatedWrapper>
    <MyCards />
  </AnimatedWrapper>
);

export const RootRouter = () => {
  const { state, dispatch } = useContext(AppContext);

  return (
    <NavigationContainer
      onStateChange={navState => {
        const { routeNames = ['Home'], index = 0 } = navState || {};
        dispatch({ type: ActionsTypes.SET_SCREEN, payload: routeNames[index] });
      }}>
      <Tab.Navigator
        initialRouteName={state?.activeScreen || 'Home'}
        sceneContainerStyle={{ backgroundColor: colors.white }}
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused }) => {
            switch (true) {
              case route.name === 'Home':
                return <HomeSVG opacity={focused ? 1 : 0.3} />;

              case route.name === 'MyCards':
                return <CardSVG opacity={focused ? 1 : 0.3} />;

              default:
                return <HomeSVG opacity={focused ? 1 : 0.3} />;
            }
          },
          headerStyle: {
            backgroundColor: 'red',
          },
          tabBarHideOnKeyboard: true,
          tabBarBackground: () => (
            <LinearGradient
              colors={[
                gradientColors.darkBlueGradient,
                gradientColors.lightBlueGradient,
              ]}
              start={{ x: 0, y: 0.5 }}
              end={{ x: 1, y: 0.5 }}
              style={styles.tapBar}
            />
          ),
          tabBarShowLabel: false,
          headerShown: false,
          tabBarActiveTintColor: 'tomato',
          tabBarInactiveTintColor: 'gray',
        })}>
        <Tab.Screen
          name="Home"
          component={AnimatedHome}
          options={{
            title: 'Home',
          }}
        />
        <Tab.Screen
          name="MyCards"
          component={AnimatedMyCards}
          options={{
            title: 'My Cards',
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  tapBar: {
    height: 100,
    width: '100%',
  },
});
