import axios from "axios";
import type {Dogs, AxiosDogsResponse} from "@/interface";
export const fetchDogs = async (dogs: Dogs[], limit: number) => {
    limit += 20;

    try {
        const response = await axios.get<AxiosDogsResponse>(`https://dog.ceo/api/breeds/image/random/${limit}`);
        response.data.message.forEach(el => dogs.push({src: el}))
    } catch (e) {
        console.log('Ошибка', e)
    }
}

