import TravelMap from "@/components/layout/travel/TravelMap";
import TravelSearchInput from "@/components/layout/travel/TravelSearchInput";

const TravelContainer = () => {
    return (
        <div className="flex h-screen">
            <TravelSearchInput/>
            <TravelMap/>
        </div>
    );
};

export default TravelContainer;