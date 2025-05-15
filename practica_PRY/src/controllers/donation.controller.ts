import type { Request, Response } from "express"
import { AppDataSource } from "../models/data-source"
import { Donation } from "../models/donation.entity"
import { Donor } from "../models/donor.entity"
import { DonationType } from "../models/donation-type.entity"

const donationRepository = AppDataSource.getRepository(Donation)
const donorRepository = AppDataSource.getRepository(Donor)
const donationTypeRepository = AppDataSource.getRepository(DonationType)

export class DonationController {
  // Obtener todas las donaciones
  static async getAll(req: Request, res: Response) {
    try {
      const donations = await donationRepository.find({
        where: { isActive: true },
        relations: ["donor", "donationType"],
      })
      return res.status(200).json(donations)
    } catch (error) {
      console.error(error)
      return res.status(500).json({ message: "Error al obtener donaciones" })
    }
  }

  // Obtener una donación por ID
  static async getById(req: Request, res: Response) {
    try {
      const id = Number.parseInt(req.params.id)
      const donation = await donationRepository.findOne({
        where: { id, isActive: true },
        relations: ["donor", "donationType"],
      })

      if (!donation) {
        return res.status(404).json({ message: "Donación no encontrada" })
      }

      return res.status(200).json(donation)
    } catch (error) {
      console.error(error)
      return res.status(500).json({ message: "Error al obtener donación" })
    }
  }

  // Crear una nueva donación
  static async create(req: Request, res: Response) {
    try {
      const { amount, description, donationDate, itemsDescription, quantity, donorId, donationTypeId } = req.body

      // Verificar que el donante existe
      const donor = await donorRepository.findOneBy({ id: donorId })
      if (!donor) {
        return res.status(404).json({ message: "Donante no encontrado" })
      }

      // Verificar que el tipo de donación existe
      const donationType = await donationTypeRepository.findOneBy({ id: donationTypeId })
      if (!donationType) {
        return res.status(404).json({ message: "Tipo de donación no encontrado" })
      }

      const donation = new Donation()
      donation.amount = amount
      donation.description = description
      donation.donationDate = donationDate ? new Date(donationDate) : new Date()
      donation.itemsDescription = itemsDescription
      donation.quantity = quantity
      donation.donor = donor
      donation.donationType = donationType

      await donationRepository.save(donation)
      return res.status(201).json(donation)
    } catch (error) {
      console.error(error)
      return res.status(500).json({ message: "Error al crear donación" })
    }
  }

  // Actualizar una donación
  static async update(req: Request, res: Response) {
    try {
      const id = Number.parseInt(req.params.id)
      const { amount, description, donationDate, itemsDescription, quantity, donorId, donationTypeId } = req.body

      const donation = await donationRepository.findOne({
        where: { id },
        relations: ["donor", "donationType"],
      })

      if (!donation) {
        return res.status(404).json({ message: "Donación no encontrada" })
      }

      // Actualizar donante si se proporciona
      if (donorId) {
        const donor = await donorRepository.findOneBy({ id: donorId })
        if (!donor) {
          return res.status(404).json({ message: "Donante no encontrado" })
        }
        donation.donor = donor
      }

      // Actualizar tipo de donación si se proporciona
      if (donationTypeId) {
        const donationType = await donationTypeRepository.findOneBy({ id: donationTypeId })
        if (!donationType) {
          return res.status(404).json({ message: "Tipo de donación no encontrado" })
        }
        donation.donationType = donationType
      }

      donation.amount = amount !== undefined ? amount : donation.amount
      donation.description = description || donation.description
      donation.donationDate = donationDate ? new Date(donationDate) : donation.donationDate
      donation.itemsDescription = itemsDescription || donation.itemsDescription
      donation.quantity = quantity !== undefined ? quantity : donation.quantity

      await donationRepository.save(donation)
      return res.status(200).json(donation)
    } catch (error) {
      console.error(error)
      return res.status(500).json({ message: "Error al actualizar donación" })
    }
  }

  // Eliminar una donación (soft delete)
  static async delete(req: Request, res: Response) {
    try {
      const id = Number.parseInt(req.params.id)
      const donation = await donationRepository.findOneBy({ id })

      if (!donation) {
        return res.status(404).json({ message: "Donación no encontrada" })
      }

      donation.isActive = false
      await donationRepository.save(donation)

      return res.status(200).json({ message: "Donación eliminada correctamente" })
    } catch (error) {
      console.error(error)
      return res.status(500).json({ message: "Error al eliminar donación" })
    }
  }
}
