import { Request, Response } from "express";
import { TravelRequestService } from "../services/TravelRequestService";

const travelRequestService = new TravelRequestService

export class TravelRequestController {

    async createRequest(req: Request, res: Response): Promise<Response> {
        try {
            const {
                userId,
                destination,
                departureDate,
                returnDate,
                overTimeStart,
                overTimeEnd
            } = req.body

            const request = await travelRequestService.createRequest({
                userId,
                destination,
                departureDate,
                returnDate,
                overTimeStart,
                overTimeEnd
            })

            return res.status(201).json({message: "Sua solicitacao foi enviada", request})
            
        } catch (error) {
            return res.status(500).json({
                message: "Erro ao criar a solicitacao"
            })
            
        }
    }
}