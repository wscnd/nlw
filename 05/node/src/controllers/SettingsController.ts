import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { SettingsRepository } from "../repositories/SettingsRepository";


class SettingsController {
    async create(req: Request, res: Response) {
        console.log(req.body);

        if (!req.body) {
            return res.status(404).end();
        }

        const { chat, username } = req.body;

        if (!chat || !username) {
            return res.status(404).end();
        }

        const settingsRepository = getCustomRepository(SettingsRepository);

        const settings = settingsRepository.create({
            chat, username
        });

        await settingsRepository.save(settings);

        return res.json(settings);
    }
}

export { SettingsController };