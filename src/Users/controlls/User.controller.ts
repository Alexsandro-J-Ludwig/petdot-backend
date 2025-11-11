import type { Request, Response } from "express";
import { UserDTO } from "../DTOs/User.dto.ts";
import { asyncHandler } from "../../utils/AsyncHandler.ts";
import { UserService } from "../services/User.service.ts";
import { UserQueryDTO } from "../DTOs/UserQuery.dto.ts";
import { UserLoginDTO } from "../DTOs/UserLogin.dto.ts";
import { UserUpdateDTO } from "../DTOs/UserUpdate.dto.ts";

class UserController {
  static createUser = asyncHandler(async (req: Request, res: Response) => {
    const dto = UserDTO.fromRequest(req.body);
    const response = await UserService.createUser(dto);
    res.status(201).json({ sucess: true, data: response });
  });

  static getURL = asyncHandler(async (_: Request, res: Response) => {
    const response = await UserService.getURL();
    res.status(201).json({ sucess: true, data: response})
  })

  static getUser = asyncHandler(async (req: Request, res: Response) => {
    const dto = UserLoginDTO.fromRequest(req.body);
    const response = await UserService.getUser(dto);
    res.status(200).json({ sucess: true, data: response });
  });

  static updateUser = asyncHandler(async (req: Request, res: Response) => {
    console.log((req as any).user); 
    const dto = UserUpdateDTO.fromRequest({ users: (req as any).user, body: req.body });
    const response = UserService.updateUser(dto);
    res.status(200).json({ sucess: true, data: response });
  });

  static deleteUser = asyncHandler(async (req: Request, res: Response) => {
    const response = UserService.deleteUser((req as any).user.uuid);
    res.status(200).json({ sucess: true, data: response });
  });
};

export { UserController };