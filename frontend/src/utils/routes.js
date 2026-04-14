/**
 * Simulates a shortest path or least crowded path algorithm.
 * In a real app, this would use Dijkstra's or A* on a graph of the venue.
 */
export const suggestLeastCrowdedPath = (zones) => {
    if (!zones || zones.length < 2) return null;

    // Sort zones by density (people count)
    const sortedZones = [...zones].sort((a, b) => a.people - b.people);

    // Suggest a path between the two least crowded zones as a "safe corridor"
    return [
        { lat: sortedZones[0].lat, lng: sortedZones[0].lng, name: sortedZones[0].name },
        { lat: sortedZones[1].lat, lng: sortedZones[1].lng, name: sortedZones[1].name }
    ];
};
