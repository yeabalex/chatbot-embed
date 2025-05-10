import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import dotenv from "dotenv";
import redis from "@/utils/redis";

dotenv.config();

export async function POST(request: NextRequest) {
    const AUTH_MICROSERVICE_URL = process.env.AUTH_MICROSERVICE_URL!;
    console.log("heya")
    
    const body = await request.json(); // Read it only once
    console.log(body); // Use the already-read body
    const redisKey = `user_urls:${body.user_id}`;

    try {
        const url = await redis.get(redisKey);

        if ((url && body.user_id)&&(JSON.parse(url).includes(body.url))) {
            console.log('Sending request to Auth microservice...');
            const response = await axios.post(
                `${AUTH_MICROSERVICE_URL}/api/v1/query`,
                { ...body, url, session_id: body.session_id },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            return NextResponse.json(response.data);
        }

        return NextResponse.json({ error: "Invalid request" });

    } catch (error) {
        console.error('Error:', error);

        if (axios.isAxiosError(error)) {
            console.error('Axios Error Response:', error.response?.data);
        }

        return NextResponse.json({ error: "Request failed" });
    }
}
