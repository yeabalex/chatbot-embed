import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import dotenv from "dotenv";
import redis from "@/utils/redis";

dotenv.config();

export async function POST(request: NextRequest) {
    const AUTH_MICROSERVICE_URL = process.env.AUTH_MICROSERVICE_URL!;
    const { user_id, url, ...data } = await request.json();
    const redisKey = `user_urls:${user_id}`;

    try {
        const redisValue = await redis.get(redisKey);
        console.log('Redis Value:', redisValue);  // Debugging log for redisValue

        // Check that redisValue matches the URL and the required fields are present
        if (redisValue && redisValue === url && user_id && url && data) {
            console.log('Sending request to Auth microservice...');
            const response = await axios.post(
                `${AUTH_MICROSERVICE_URL}/api/v1/query`,
                { ...data, user_id, url },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            ); 
            return NextResponse.json(response.data);
        }

        console.log('Invalid request - missing data or URL mismatch');
        return NextResponse.json({ error: "Invalid request" });

    } catch (error) {
        console.error('Error:', error);

        if (axios.isAxiosError(error)) {
            // Log the response from axios if it's an AxiosError
            console.error('Axios Error Response:', error.response?.data);
        }

        return NextResponse.json({ error: "Request failed" });
    }
}
