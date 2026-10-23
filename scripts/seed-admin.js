import 'dotenv/config'
import bcrypt from 'bcryptjs'
import { connectDB } from '../api/db.js'
import { Admin } from '../api/models/index.js'

const run = async () => {
  try {
    await connectDB()

    const email = process.env.ADMIN_EMAIL?.trim().toLowerCase()
    const password = process.env.ADMIN_PASSWORD

    if (!email || !password) {
      throw new Error(
        'Set ADMIN_EMAIL and ADMIN_PASSWORD in .env first.'
      )
    }

    // Create a fresh bcrypt hash from the password in .env
    const passwordHash = await bcrypt.hash(password, 12)

    // Create/update the admin account
    const admin = await Admin.findOneAndUpdate(
      { email },
      {
        email,
        passwordHash,
        role: 'super_admin',
        active: true,
      },
      {
        upsert: true,
        new: true,
        setDefaultsOnInsert: true,
      }
    )

    // Immediately verify that the saved hash matches the .env password
    const passwordWorks = await bcrypt.compare(
      password,
      admin.passwordHash
    )

    console.log('')
    console.log('====================================')
    console.log('TMG ADMIN SETUP')
    console.log('====================================')
    console.log(`Email: ${admin.email}`)
    console.log(`Active: ${admin.active}`)
    console.log(`Role: ${admin.role}`)
    console.log(`Password hash verified: ${passwordWorks}`)
    console.log('====================================')

    if (!passwordWorks) {
      throw new Error(
        'The password was saved, but bcrypt verification failed.'
      )
    }

    console.log('Admin login credentials are ready.')
    console.log('')

    process.exit(0)
  } catch (error) {
    console.error('')
    console.error('ADMIN SEED FAILED')
    console.error(error)
    console.error('')
    process.exit(1)
  }
}

run()