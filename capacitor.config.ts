import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.Universalbook',
  appName: 'Universal Book',
  webDir: 'www',
  bundledWebRuntime: false,
  plugins: { 
    SplashScreen: {
      launchShowDuration: 4000,
      launchAutoHide: true,
    }
  }
};
export default config;
