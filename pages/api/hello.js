
import connectMongo from '../../database/connect'

export default function handler(req, res) {
  connectMongo()
  res.status(200).json({ name: 'Mughees' })
}