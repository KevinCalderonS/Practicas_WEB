import { AppDataSource } from "../models/data-source"
import { Donor } from "../models/donor.entity"
import { DonationType } from "../models/donation-type.entity"
import { Donation } from "../models/donation.entity"
import { DonorRecognition } from "../models/donor-recognition.entity"
import { DonationGoal } from "../models/donation-goal.entity"

// Función para inicializar la base de datos con datos de prueba
export async function seedDatabase() {
  try {
    // Inicializar la conexión a la base de datos
    await AppDataSource.initialize()
    console.log("Conexión a la base de datos establecida")

    // Crear tipos de donación
    const donationTypes = await createDonationTypes()
    console.log("Tipos de donación creados:", donationTypes.length)

    // Crear donantes
    const donors = await createDonors()
    console.log("Donantes creados:", donors.length)

    // Crear donaciones
    const donations = await createDonations(donors, donationTypes)
    console.log("Donaciones creadas:", donations.length)

    // Crear reconocimientos
    const recognitions = await createRecognitions(donors)
    console.log("Reconocimientos creados:", recognitions.length)

    // Crear metas de donación
    const goals = await createDonationGoals()
    console.log("Metas de donación creadas:", goals.length)

    console.log("Base de datos inicializada correctamente")
  } catch (error) {
    console.error("Error al inicializar la base de datos:", error)
  }
}

// Crear tipos de donación
async function createDonationTypes(): Promise<DonationType[]> {
  const donationTypeRepository = AppDataSource.getRepository(DonationType)

  // Verificar si ya existen tipos de donación
  const existingCount = await donationTypeRepository.count()
  if (existingCount > 0) {
    return await donationTypeRepository.find()
  }

  const types = [
    { name: "Dinero", description: "Donaciones monetarias" },
    { name: "Alimentos", description: "Donaciones de alimentos no perecederos" },
    { name: "Ropa", description: "Donaciones de ropa en buen estado" },
    { name: "Medicamentos", description: "Donaciones de medicamentos" },
    { name: "Suministros", description: "Donaciones de suministros varios" },
  ]

  const donationTypes: DonationType[] = []

  for (const type of types) {
    const donationType = new DonationType()
    donationType.name = type.name
    donationType.description = type.description
    donationTypes.push(await donationTypeRepository.save(donationType))
  }

  return donationTypes
}

// Crear donantes
async function createDonors(): Promise<Donor[]> {
  const donorRepository = AppDataSource.getRepository(Donor)

  // Verificar si ya existen donantes
  const existingCount = await donorRepository.count()
  if (existingCount > 0) {
    return await donorRepository.find()
  }

  const donorData = [
    {
      name: "Juan Pérez",
      email: "juan@example.com",
      phone: "555-1234",
      address: "Calle Principal 123",
      city: "Guayaquil",
      state: "Guayas",
      zipCode: "090150",
    },
    {
      name: "María López",
      email: "maria@example.com",
      phone: "555-5678",
      address: "Avenida Central 456",
      city: "Quito",
      state: "Pichincha",
      zipCode: "170150",
    },
    {
      name: "Carlos Rodríguez",
      email: "carlos@example.com",
      phone: "555-9012",
      address: "Calle Secundaria 789",
      city: "Cuenca",
      state: "Azuay",
      zipCode: "010150",
    },
    {
      name: "Ana Martínez",
      email: "ana@example.com",
      phone: "555-3456",
      address: "Avenida Norte 101",
      city: "Manta",
      state: "Manabí",
      zipCode: "130802",
    },
    {
      name: "Pedro Sánchez",
      email: "pedro@example.com",
      phone: "555-7890",
      address: "Calle Sur 202",
      city: "Ambato",
      state: "Tungurahua",
      zipCode: "180103",
    },
  ]

  const donors: Donor[] = []

  for (const data of donorData) {
    const donor = new Donor()
    donor.name = data.name
    donor.email = data.email
    donor.phone = data.phone
    donor.address = data.address
    donor.city = data.city
    donor.state = data.state
    donor.zipCode = data.zipCode
    donors.push(await donorRepository.save(donor))
  }

  return donors
}

// Crear donaciones
async function createDonations(donors: Donor[], donationTypes: DonationType[]): Promise<Donation[]> {
  const donationRepository = AppDataSource.getRepository(Donation)

  // Verificar si ya existen donaciones
  const existingCount = await donationRepository.count()
  if (existingCount > 0) {
    return await donationRepository.find()
  }

  const donationData = [
    { amount: 100, description: "Donación mensual", donorIndex: 0, typeIndex: 0 },
    {
      amount: null,
      description: "Donación de alimentos",
      itemsDescription: "5kg de arroz, 3kg de frijoles",
      quantity: 8,
      donorIndex: 1,
      typeIndex: 1,
    },
    { amount: 250, description: "Donación anual", donorIndex: 2, typeIndex: 0 },
    {
      amount: null,
      description: "Donación de ropa",
      itemsDescription: "10 camisetas, 5 pantalones",
      quantity: 15,
      donorIndex: 3,
      typeIndex: 2,
    },
    {
      amount: null,
      description: "Donación de suministros",
      itemsDescription: "Cuadernos, lápices, mochilas",
      quantity: 20,
      donorIndex: 4,
      typeIndex: 4,
    },
    { amount: 50, description: "Donación única", donorIndex: 0, typeIndex: 0 },
    {
      amount: null,
      description: "Donación de medicamentos",
      itemsDescription: "Analgésicos, antibióticos",
      quantity: 10,
      donorIndex: 1,
      typeIndex: 3,
    },
  ]

  const donations: Donation[] = []

  for (const data of donationData) {
    const donation = new Donation()
    if (data.amount !== null && data.amount !== undefined) {
      donation.amount = data.amount
    }
    donation.description = data.description
    donation.itemsDescription = data.itemsDescription ?? ""
    if (data.quantity !== undefined) {
      donation.quantity = data.quantity
    }
    donation.donationDate = new Date()
    donation.donor = donors[data.donorIndex]
    donation.donationType = donationTypes[data.typeIndex]
    donations.push(await donationRepository.save(donation))
  }

  return donations
}

// Crear reconocimientos
async function createRecognitions(donors: Donor[]): Promise<DonorRecognition[]> {
  const recognitionRepository = AppDataSource.getRepository(DonorRecognition)

  // Verificar si ya existen reconocimientos
  const existingCount = await recognitionRepository.count()
  if (existingCount > 0) {
    return await recognitionRepository.find()
  }

  const recognitionData = [
    { title: "Donante del Mes", description: "Reconocimiento por ser el donante más generoso del mes", donorIndex: 0 },
    { title: "Donante Frecuente", description: "Reconocimiento por donaciones constantes", donorIndex: 1 },
    { title: "Donante Destacado", description: "Reconocimiento por contribuciones significativas", donorIndex: 2 },
    { title: "Donante Comprometido", description: "Reconocimiento por su compromiso con la causa", donorIndex: 3 },
    { title: "Donante Ejemplar", description: "Reconocimiento por ser un ejemplo para la comunidad", donorIndex: 4 },
  ]

  const recognitions: DonorRecognition[] = []

  for (const data of recognitionData) {
    const recognition = new DonorRecognition()
    recognition.title = data.title
    recognition.description = data.description
    recognition.recognitionDate = new Date()
    recognition.donor = donors[data.donorIndex]
    recognitions.push(await recognitionRepository.save(recognition))
  }

  return recognitions
}

// Crear metas de donación
async function createDonationGoals(): Promise<DonationGoal[]> {
  const goalRepository = AppDataSource.getRepository(DonationGoal)

  // Verificar si ya existen metas
  const existingCount = await goalRepository.count()
  if (existingCount > 0) {
    return await goalRepository.find()
  }

  const goalData = [
    {
      title: "Campaña Navideña",
      description: "Meta para recaudar fondos durante la temporada navideña",
      targetAmount: 5000,
      currentAmount: 1200,
    },
    {
      title: "Campaña Escolar",
      description: "Meta para recaudar útiles escolares",
      targetAmount: 3000,
      currentAmount: 800,
    },
    {
      title: "Campaña de Alimentos",
      description: "Meta para recaudar alimentos no perecederos",
      targetAmount: 2000,
      currentAmount: 500,
    },
    {
      title: "Campaña de Medicamentos",
      description: "Meta para recaudar medicamentos esenciales",
      targetAmount: 4000,
      currentAmount: 1500,
    },
    {
      title: "Campaña de Emergencia",
      description: "Meta para recaudar fondos para situaciones de emergencia",
      targetAmount: 10000,
      currentAmount: 3000,
    },
  ]

  const goals: DonationGoal[] = []

  const now = new Date()
  const threeMonthsLater = new Date()
  threeMonthsLater.setMonth(threeMonthsLater.getMonth() + 3)

  for (const data of goalData) {
    const goal = new DonationGoal()
    goal.title = data.title
    goal.description = data.description
    goal.targetAmount = data.targetAmount
    goal.currentAmount = data.currentAmount
    goal.startDate = new Date(now)
    goal.endDate = new Date(threeMonthsLater)
    goal.status = "active"
    goals.push(await goalRepository.save(goal))
  }

  return goals
}

// Ejecutar la función de inicialización si este archivo se ejecuta directamente
if (require.main === module) {
  seedDatabase()
    .then(() => {
      console.log("Proceso de inicialización completado")
      process.exit(0)
    })
    .catch((error) => {
      console.error("Error en el proceso de inicialización:", error)
      process.exit(1)
    })
}
