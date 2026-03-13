import { Request, Response } from "express";
import { UserService } from "../services/UserService";

const userService = new UserService();

export class UserController {
  //POST/api
  async create(req: Request, res: Response): Promise<Response> {
    try {
      const user = await userService.create(req.body);
      const { password, ...userWithoutPassword } = user;
      return res.status(201).json(userWithoutPassword);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Erro ao criar usuario" });
    }
  }

  //GET/api
  async findAll(req: Request, res: Response): Promise<Response> {
    const users = await userService.findAll();
    const usersWithoutPassword = users.map(({ password, ...user }) => user);
    return res.status(200).json(usersWithoutPassword);
  }

  //GET/users/:id
  async findById(req: Request, res: Response): Promise<Response> {
    const idParams = Number(req.params.id as string);
    const user = await userService.findById(idParams);

    if (!user) {
      return res.status(400).json({ message: "Usuario nao encontrado" });
    }

    const { password, ...userWithoutPassword } = user;
    return res.status(200).json(userWithoutPassword);
  }
}
