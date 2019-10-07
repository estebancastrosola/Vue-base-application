import { addMinutes, isPast, format } from 'date-fns';
import update from '@/services/api/updateSite';
import { store } from '@/store';

const MINUTES_TO_CHECK_FOR_UPDATES = 120;


// If no localstorage appVersion or checkForAppUpdatesAt have been set, then set them
export const setLocalStorageDateForUpdates = () => {
  if (window.localStorage.getItem('checkForAppUpdatesAt') === null) {
    window.localStorage.setItem(
      'checkForAppUpdatesAt',
      JSON.stringify(format(new Date(), 'X')),
    );
  }
};

// Gets file from axios at url SERVER/version.json
export const checkForUpdates = () => {
  setLocalStorageDateForUpdates();
  // Checks if checkForAppUpdatesAt set in localstorage is past to check for updates
  if (
    isPast(
      new Date(
        JSON.parse(window.localStorage.getItem('checkForAppUpdatesAt')) * 1000,
      ),
    )
  ) {
    update
      .checkIfUpdatedSiteVersion()
      .then((response) => {
        if (response.status === 200) {
          // Get latestVersion from response
          const latestVersion = response.data.version.trim();
          // Get localVersion from localstorage
          const localVersion = store.getters.appVersion;
          // Checks if an update is needed
          checkIfUpdateIsNeeded(latestVersion, localVersion);
        }
      })
      // eslint-disable-next-line no-unused-vars
      .catch((error) => {});
  }
};
