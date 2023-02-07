import { useEffect, useState } from "react";
import { fetchRandomJoke } from "../api/joke-third-party-API";
import PulseLoader from "../components/PulseLoader";

interface IProps {
    category: string;
}
export interface IJoke {
    icon_url: string;
    id: string;
    url: string;
    value: string;
}

const useRandomJoke = ({category}: IProps): string | JSX.Element => {
    const [joke, setJoke] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        fetchRandomJoke(category)
            .then((data) => {
                setJoke(data.value);
                setLoading(false);
            })
            .catch((err) => {
                console.log(err);
                setLoading(false);
            });
    }, [category]);

    if (loading) return <PulseLoader />;

    return joke;
}

export default useRandomJoke;