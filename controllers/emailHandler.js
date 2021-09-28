import axios from 'axios'

const userId = process.env.EMAILJS_USER_ID || 'user_YipTcQPqpJE9xHvY4eLgq'
const serviceId = process.env.EMAILJS_SERVICE_ID || 'service_ppufh0f'
const templateId = process.env.EMAILJS_TEMPLATE_ID || 'template_7ei7joa'

const url = 'https://api.emailjs.com/api/v1.0/email/send'

console.log(userId)

export const sendHappyEmail = async function (newMovie) {
  const options = {
    method: 'POST',
    url,
    body: {
      service_id: serviceId,
      template_id: templateId,
      user_id: userId,
      accessToken: '4b5a4785439f55640014a4749f656d91',
      template_params: {
        title: newMovie.title,
        description: newMovie.description,
      },
    },
  }

  const { data } = await axios.request(options)
  return data
}

sendHappyEmail({ title: 'Nomadland', description: 'A movie about vans' })
