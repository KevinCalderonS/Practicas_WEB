import type { Request, Response } from "express"
import { AppDataSource } from "../models/data-source"
import { DonationType } from "../models/donation-type.entity"

const donationTypeRepository = AppDataSource.getRepository(DonationType)

export class DonationTypeController {
  // Obtener todos los tipos de donación
  static async getAll(req: Request, res: Response) {
    try {
      const donationTypes = await donationTypeRepository.find({
        where: { isActive: true },
        relations: ["donations"],
      })
      return res.status(200).json(donationTypes)
    } catch (error) {
      console.error(error)
      return res.status(500).json({ message: "Error al obtener tipos de donación" })
    }
  }

  // Obtener un tipo de donación por ID
  static async getById(req: Request, res: Response) {
    try {
      const id = Number.parseInt(req.params.id)
      const donationType = await donationTypeRepository.findOne({
        where: { id, isActive: true },
        relations: ["donations"],
      })

      if (!donationType) {
        return res.status(404).json({ message: "Tipo de donación no encontrado" })
      }

      return res.status(200).json(donationType)
    } catch (error) {
      console.error(error)
      return res.status(500).json({ message: "Error al obtener tipo de donación" })
    }
  }

  // Crear un nuevo tipo de donación
  static async create(req: Request, res: Response) {
    try {
      const { name, description } = req.body

      const donationType = new DonationType()
      donationType.name = name
      donationType.description = description

      await donationTypeRepository.save(donationType)
      return res.status(201).json(donationType)
    } catch (error) {
      console.error(error)
      return res.status(500).json({ message: "Error al crear tipo de donación" })
    }
  }

  // Actualizar un tipo de donación
  static async update(req: Request, res: Response) {
    try {
      const id = Number.parseInt(req.params.id)
      const { name, description } = req.body

      const donationType = await donationTypeRepository.findOneBy({ id })

      if (!donationType) {
        return res.status(404).json({ message: "Tipo de donación no encontrado" })
      }

      donationType.name = name || donationType.name
      donationType.description = description || donationType.description

      await donationTypeRepository.save(donationType)
      return res.status(200).json(donationType)
    } catch (error) {
      console.error(error)
      return res.status(500).json({ message: "Error al actualizar tipo de donación" })
    }
  }

  // Eliminar un tipo de donación (soft delete)
  static async delete(req: Request, res: Response) {
    try {
      const id = Number.parseInt(req.params.id)
      const donationType = await donationTypeRepository.findOneBy({ id })

      if (!donationType) {
        return res.status(404).json({ message: "Tipo de donación no encontrado" })
      }

      donationType.isActive = false
      await donationTypeRepository.save(donationType)

      return res.status(200).json({ message: "Tipo de donación eliminado correctamente" })
    } catch (error) {
      console.error(error)
      return res.status(500).json({ message: "Error al eliminar tipo de donación" })
    }
  }
}
