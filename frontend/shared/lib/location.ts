export type UserLocation = {
  latitude: number;
  longitude: number;
  accuracy: number;
};

export async function getUserLocation(): Promise<UserLocation> {
  if (!("geolocation" in navigator)) {
    throw new Error("Geolocation is not supported by this browser.");
  }

  // Check permission state if the browser supports Permissions API
  if ("permissions" in navigator) {
    try {
      const permission = await navigator.permissions.query({
        name: "geolocation",
      });

      console.log("Geolocation permission:", permission.state);

      if (permission.state === "denied") {
        throw new Error(
          "Location permission is denied. Please enable location access in your iPhone/browser settings.",
        );
      }
    } catch (error) {
      // Safari may not fully support the Permissions API.
      // We continue to getCurrentPosition() below.
      console.log("Could not query location permission:", error);
    }
  }

  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        console.log("Location received:", {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          accuracy: position.coords.accuracy,
        });

        resolve({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          accuracy: position.coords.accuracy,
        });
      },
      (error) => {
        console.error("Geolocation error:", {
          code: error.code,
          message: error.message,
        });

        switch (error.code) {
          case error.PERMISSION_DENIED:
            reject(new Error("Location permission was denied. Please allow location access and try again."));
            break;

          case error.POSITION_UNAVAILABLE:
            reject(new Error("Location is unavailable. Please enable Location Services on your iPhone."));
            break;

          case error.TIMEOUT:
            reject(new Error("Location request timed out. Please try again."));
            break;

          default:
            reject(new Error("Unable to get your location."));
        }
      },
      {
        enableHighAccuracy: true,
        timeout: 30000,
        maximumAge: 0,
      },
    );
  });
}
