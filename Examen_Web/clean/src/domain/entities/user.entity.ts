export interface UserPreferences {
  theme: "light" | "dark"
  studyReminders: boolean
  dailyGoal: number
  autoPlayAudio: boolean
}

export class UserEntity {
  constructor(
    public id: string,
    public email: string,
    public username: string,
    public firstName: string,
    public lastName: string,
    public preferences: UserPreferences,
    public createdAt: Date,
    public lastLoginAt: Date,
    public profileImageUrl?: string,
    public totalStudyTime = 0,
    public streakDays = 0,
    public level = 1,
    public experience = 0,
  ) {}

  public static create(object: { [key: string]: any }): UserEntity {
    const {
      id,
      email,
      username,
      firstName,
      lastName,
      preferences,
      profileImageUrl,
      totalStudyTime,
      streakDays,
      level,
      experience,
      createdAt,
      lastLoginAt,
    } = object

    if (!id) throw new Error("User id is required")
    if (!email) throw new Error("User email is required")
    if (!username) throw new Error("Username is required")
    if (!firstName) throw new Error("First name is required")
    if (!lastName) throw new Error("Last name is required")

    const defaultPreferences: UserPreferences = {
      theme: "light",
      studyReminders: true,
      dailyGoal: 20,
      autoPlayAudio: false,
    }

    return new UserEntity(
      id,
      email,
      username,
      firstName,
      lastName,
      preferences || defaultPreferences,
      createdAt || new Date(),
      lastLoginAt || new Date(),
      profileImageUrl,
      totalStudyTime || 0,
      streakDays || 0,
      level || 1,
      experience || 0,
    )
  }

  public addExperience(points: number): void {
    this.experience += points
    this.checkLevelUp()
  }

  private checkLevelUp(): void {
    const requiredExp = this.level * 100
    if (this.experience >= requiredExp) {
      this.level++
      this.experience -= requiredExp
    }
  }

  public updateStreak(studiedToday: boolean): void {
    if (studiedToday) {
      this.streakDays++
    } else {
      this.streakDays = 0
    }
  }
}
