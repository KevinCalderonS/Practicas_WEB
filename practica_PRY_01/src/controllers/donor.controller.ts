import type { Request, Response } from "express"
import { AppDataSource } from "../models/data-source"
import { Donor } from "../models/donor.entity"

const donorRepository = AppDataSource.getRepository(Donor)

export class DonorController {
  // Obtener todos los donantes
  static async getAll(req: Request, res: Response) {
    try {
      const donors = await donorRepository.find({
        where: { isActive: true },
        relations: ["donations", "recognitions"],
      })
      return res.status(200).json(donors)
    } catch (error) {
      console.error(error)
      return res.status(500).json({ message: "Error al obtener donantes" })
    }
  }

  // Obtener un donante por ID
  static async getById(req: Request, res: Response) {
    try {
      const id = Number.parseInt(req.params.id)
      const donor = await donorRepository.findOne({
        where: { id, isActive: true },
        relations: ["donations", "recognitions"],
      })

      if (!donor) {
        return res.status(404).json({ message: "Donante no encontrado" })
      }

      return res.status(200).json(donor)
    } catch (error) {
      console.error(error)
      return res.status(500).json({ message: "Error al obtener donante" })
    }
  }

  // Crear un nuevo donante
  static async create(req: Request, res: Response) {
    try {
      const { name, email, phone, address, city, state, zipCode } = req.body

      const donor = new Donor()
      donor.name = name
      donor.email = email
      donor.phone = phone
      donor.address = address
      donor.city = city
      donor.state = state
      donor.zipCode = zipCode

      await donorRepository.save(donor)
      return res.status(201).json(donor)
    } catch (error) {
      console.error(error)
      return res.status(500).json({ message: "Error al crear donante" })
    }
  }

  // Actualizar un donante
  static async update(req: Request, res: Response) {
    try {
      const id = Number.parseInt(req.params.id)
      const { name, email, phone, address, city, state, zipCode } = req.body

      const donor = await donorRepository.findOneBy({ id })

      if (!donor) {
        return res.status(404).json({ message: "Donante no encontrado" })
      }

      donor.name = name || donor.name
      donor.email = email || donor.email
      donor.phone = phone || donor.phone
      donor.address = address || donor.address
      donor.city = city || donor.city
      donor.state = state || donor.state
      donor.zipCode = zipCode || donor.zipCode

      await donorRepository.save(donor)
      return res.status(200).json(donor)
    } catch (error) {
      console.error(error)
      return res.status(500).json({ message: "Error al actualizar donante" })
    }
  }

  // Eliminar un donante (soft delete)
  static async delete(req: Request, res: Response) {
    try {
      const id = Number.parseInt(req.params.id)
      const donor = await donorRepository.findOneBy({ id })

      if (!donor) {
        return res.status(404).json({ message: "Donante no encontrado" })
      }

      donor.isActive = false
      await donorRepository.save(donor)

      return res.status(200).json({ message: "Donante eliminado correctamente" })
    } catch (error) {
      console.error(error)
      return res.status(500).json({ message: "Error al eliminar donante" })
    }
  }
}
