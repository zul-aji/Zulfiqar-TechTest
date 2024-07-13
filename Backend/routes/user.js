import { Router } from 'express'
import User from '../models/user.js'

const router = Router()

// Get all users
router.get('/', async (req, res) => {
    try {
        const users = await User.find()
        res.status(200).json(users)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

// Get one user
router.get('/:id', getUser, (req, res) => {
    res.json(res.user)
})

// Create one user
router.post('/', invalidData, async (req, res) => {
    const user = new User({
        nama: req.body.nama,
        tempat_lahir: req.body.tempat_lahir,
        tanggal_lahir: req.body.tanggal_lahir,
        jenis_kelamin: req.body.jenis_kelamin,
        telepon: req.body.telepon,
        whatsapp: req.body.whatsapp,
        email: req.body.email,
    })

    try {
        const newUser = await user.save()
        res.status(201).json(newUser)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
})

// Update one user
router.put('/:id', getUser, async (req, res) => {
    res.user.nama = req.body.nama
    res.user.tempat_lahir = req.body.tempat_lahir
    res.user.tanggal_lahir = req.body.tanggal_lahir
    res.user.jenis_kelamin = req.body.jenis_kelamin
    res.user.telepon = req.body.telepon

    try {
        const updatedUser = await res.user.save()
        res.json(updatedUser)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
})

// Delete one user
router.delete('/:id', getUser, async (req, res) => {
    try {
        await res.user.deleteOne()
        res.json({ message: 'User deleted successfully' })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

async function getUser(req, res, next) {
    try {
        let user = await User.findById(req.params.id)
        if(user == null){
            return res.status(404).json({ message: 'User not found' })
        }
        res.user = user
        next()
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

async function invalidData(req, res, next) {
  const { email, whatsapp } = req.body;

  try {
    // Validate WhatsApp number format
    const whatsappRegex = /^(\+62|62|0)8\d{8,11}$/;
    if (!whatsappRegex.test(whatsapp)) {
      return res.status(400).json({ message: 'Invalid WhatsApp number format' });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: 'Invalid email format' });
    }

    // Check if the WhatsApp number already exists
    const userWithWhatsapp = await User.findOne({ whatsapp });
    if (userWithWhatsapp) {
      return res.status(400).json({ message: 'WhatsApp number already in use' });
    }

    // Check if the email already exists
    const userWithEmail = await User.findOne({ email });
    if (userWithEmail) {
      return res.status(400).json({ message: 'Email already in use' });
    }

    // If everything is valid, proceed to the next middleware/route handler
    next();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export default router