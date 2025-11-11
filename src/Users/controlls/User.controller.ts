import type { Request, Response } from "express";
import { UserDTO } from "../DTOs/User.dto.ts";
import { asyncHandler } from "../../utils/AsyncHandler.ts";
import { UserService } from "../services/User.service.ts";

class UserController {
    static createUser = asyncHandler(async (req: Request, res: Response) => {
        const dto = UserDTO.fromRequest(req.body);
        const user = await UserService.createUser(dto);
        res.status(201).json({ sucess: true, data: user });
    });
}