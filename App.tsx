import { StatusBar } from 'expo-status-bar';
import { LogBox, StyleSheet, Text, View } from 'react-native';
import Navigation from './src/navigation';
import { Provider } from 'react-redux';
import { store } from './src/redux/store';
import { StripeProvider } from '@stripe/stripe-react-native';
LogBox.ignoreAllLogs(true)

const PUBLIST_STRIPE_KEY='pk_test_51OkqHLDWHooJD0vhqJHXExioawQQI7REljZF432gsQikATKNSL9fuU9DtvpxvN5qgoP28GNo1z5XkwSY1W6lZzJi00aTGnTRFx'

export default function App() {
  return (
    <Provider store={store}>
      <StripeProvider publishableKey={PUBLIST_STRIPE_KEY}>
        <Navigation />
      </StripeProvider>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
