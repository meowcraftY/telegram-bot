const fetch = require('node-fetch')
const imgbb = require('imgbb-uploader')
const axios = require('axios')
const cfonts = require('cfonts')

const getBuffer = async (url, options) => {
	try {
		options ? options : {}
		const res = await axios({
			method: "get",
			url,
			headers: {
				'DNT': 1,
				'Upgrade-Insecure-Request': 1
			},
			...options,
			responseType: 'arraybuffer'
		})
		return res.data
	} catch (e) {
		console.log(`Error : ${e}`)
	}
}

const banner = cfonts.render(('MEOW|GANSS'), {
    font: 'block',
    color: 'candy',
    align: 'center',
    gradient: ["red","yellow"],
    lineHeight: 3
  });


module.exports = { getBuffer, banner }
