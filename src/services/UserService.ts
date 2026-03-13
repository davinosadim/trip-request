import { AppDataSource } from "../database/data-source";
import { User } from "../entities/User";
import { CreateUserDTO } from "../utils/userValidation";

const userRepository = AppDataSource.getRepository(User);

export class UserService {
  async create(userData: CreateUserDTO): Promise<User> {
    const newUser = userRepository.create(userData);
    const savedUser = await userRepository.save(newUser);
    return savedUser;
  }

  async findAll(): Promise<User[]> {
    return userRepository.find();
  }

  async findById(id: number): Promise<User | null> {
    return userRepository.findOneBy({ id });
  }

  async delete(id: number): Promise<void> {
    await userRepository.delete(id);
  }
}
