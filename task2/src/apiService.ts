import axios from "axios";
import { API_BASE_URL, AUTH_ENDPOINT, EVENT_ENDPOINT, API_BEARER_TOKEN} from "./config";

export interface Event {
    id: string;
    date: string;
    slug: string;
    title: string;
    description: string;
    images: {
        mobile: string;
        tablet_port: string;
        tablet_land: string;
        desktop: string;
    }
}

interface AuthResponse {
    token: string;
}

export const authenticate = async (): Promise<string> => {
    try {
        console.log("step 1")
        const response = await axios.post<AuthResponse>(`${API_BASE_URL}${AUTH_ENDPOINT}`,
            {},
            {
                headers: {
                    Authorization: `Bearer ${API_BEARER_TOKEN}`,
                },
            }
        );
        return response.data.toString();

    } catch (error) {
        console.error("Authentication failed:", error);
        throw error;
    }
};

export const getEventsByMonth = async (monthNumber: number, token:any): Promise<Event[]> => {
    try {
        const response = await axios.get<Event[]>(
            `${API_BASE_URL}${EVENT_ENDPOINT}/${monthNumber}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        return response.data;
    } catch (error) {
        console.error("Failed to fetch events:", error);
        throw error;
    }
};
