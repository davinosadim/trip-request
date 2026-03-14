import { Request, Response } from "express";
import { TravelRequestService } from "../services/TravelRequestService";
import { id } from "zod/v4/locales";

const travelRequestService = new TravelRequestService

export class TravelRequestController {

    async createRequest(req: Request, res: Response): Promise<Response> {
        try {
            
            const request = await travelRequestService.createRequest(req.body)

            return res.status(201).json({message: "Request created", request: {
                id: request.id,
                destination: request.destination,
                departureDate: request.departureDate,
                returnDate: request.returnDate,
                status: request.status
            }})
            
        } catch (error) {
            return res.status(500).json({
                message: "Erro ao criar a solicitacao"
            })
            
        }
    }
}