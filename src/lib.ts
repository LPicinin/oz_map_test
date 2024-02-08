import axios from "axios";
class GeoLib {
  public getAddressFromCoordinates(
    coordinates: [number, number] | { lat: number; lng: number }
  ): Promise<string> {
    let { lat, lng } = Array.isArray(coordinates)
      ? { lat: coordinates[0], lng: coordinates[1] }
      : coordinates;
    return Promise.resolve(
      axios
        .get(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
        )
        .then((res) => {
          if (res.data["address"]["town"]) return res.data["address"]["town"];
          else return res.data["address"]["city"];
        })
    );
  }

  public getCoordinatesFromAddress(
    address: string
  ): Promise<{ lat: number; lng: number }> {
    return Promise.resolve(
      axios
        .get(
          `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
            address
          )}`
        )
        .then((res) => {
          if (res.data.length > 0)
            return {
              lat: Number.parseFloat(res.data[0]["lat"]),
              lng: Number.parseFloat(res.data[0]["lon"]),
            };
        })
    );
  }
}

export default new GeoLib();
