let BASE_URL = ''
const TIME_OUT = 10000

if (import.meta.env.MODE === 'development') {
  // BASE_URL = '/api'
  BASE_URL = '/mock'
} else if (import.meta.env.MODE === 'production') {
  // BASE_URL = '/api'
  BASE_URL = 'http://152.136.185.210:5000/'
} else {
  BASE_URL = 'https://vue3.org/test'
}

export { BASE_URL, TIME_OUT }
