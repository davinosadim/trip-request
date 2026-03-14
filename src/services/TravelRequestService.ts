import { AppDataSource } from "../database/data-source";
import { TravelRequest } from "../entities/TravelRequest";
import { User } from "../entities/User";
import { CreateTravelRequestDTO } from "../utils/travelRequestValidation";

const travelRequestRepository = AppDataSource.getRepository(TravelRequest);
const userRepository = AppDataSource.getRepository(User);

export class TravelRequestService {
    async createRequest(requestData: CreateTravelRequestDTO): Promise<TravelRequest>{
        const user = await userRepository.findOneBy({id: requestData.userId})

        if(!user) {
            throw new Error("Usuario nao encontrado")
        }

        const newRequestData: Partial<TravelRequest> = {
            user,
            destination: requestData.destination,
            departureDate: requestData.departureDate,
            returnDate: requestData.returnDate
        }

        if (requestData.overTimeStart !== undefined) {
      newRequestData.overTimeStart = requestData.overTimeStart;
    }

    if (requestData.overTimeEnd !== undefined) {
      newRequestData.overTimeEnd = requestData.overTimeEnd;
    }

    const newRequest = travelRequestRepository.create(newRequestData);

    await travelRequestRepository.save(newRequest);
    return newRequest;

    }
}