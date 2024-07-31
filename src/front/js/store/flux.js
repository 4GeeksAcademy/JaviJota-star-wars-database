const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			people: [],
			planets: [],
			starships: [],
			token: '',
			user: '',
			peopleImages: [
				"https://lumiere-a.akamaihd.net/v1/images/luke-skywalker-main_7ffe21c7.jpeg?region=270%2C143%2C1070%2C804",
				"https://lumiere-a.akamaihd.net/v1/images/c-3po-main_d6850e28.jpeg?region=176%2C0%2C951%2C536",
				"https://cdn.hobbyconsolas.com/sites/navi.axelspringer.es/public/media/image/2016/08/r2-d2.jpg",
				"https://prod-ripcut-delivery.disney-plus.net/v1/variant/disney/B0BDA09845AA575291C38D21E462571A6E07AC34899505FA6F6D615137B15EDF/scale?width=1200&amp;aspectRatio=1.78&amp;format=webp",
				"https://www.ecured.cu/images/f/f3/Leia.jpg",
				"https://lumiere-a.akamaihd.net/v1/images/owen-lars-main_08c717c8.jpeg?region=0%2C24%2C1280%2C642",
				"https://fullstarwars.wordpress.com/wp-content/uploads/2015/05/berulars01.jpg",
				"https://www.looper.com/img/gallery/r5-d4-the-complete-history-of-din-djarins-ally-in-the-mandalorian-explained/l-intro-1678514086.jpg",
				"https://lumiere-a.akamaihd.net/v1/images/image_606ff7f7.jpeg?region=0%2C0%2C1560%2C878",
				"https://hips.hearstapps.com/hmg-prod/images/obi-wan-kenobi-1655894421.jpeg?crop=0.9991111111111111xw:1xh;center,top&resize=1200:*",

			],
			planetsImages: [
				"https://static.wikia.nocookie.net/esstarwars/images/e/e6/MosEisley-celebration.png/revision/latest?cb=20140805192904",
				"https://lumiere-a.akamaihd.net/v1/images/alderaan-main_f5b676cf.jpeg?region=0%2C0%2C1280%2C720",
				"https://lumiere-a.akamaihd.net/v1/images/open-uri20150608-27674-1kk1hf0_8292f2b0.jpeg?region=0%2C0%2C1200%2C509",
				"https://pm1.aminoapps.com/6592/17fa9c214dad4ac1671fb301286aa9095e3a5dab_hq.jpg",
				"https://images2.minutemediacdn.com/image/upload/c_fill,w_720,ar_16:9,f_auto,q_auto,g_auto/shape/cover/sport/dd66eb523605e3af9f4bf604cef539b4f0412f0bd5c0d321a378e83f3383eaea.jpg",
				"https://static.wikia.nocookie.net/esstarwars/images/3/31/Bespin_skyscrapers.png/revision/latest?cb=20170527225407",
				"https://frikipolis.com/wp-content/uploads/2022/08/b280692631df89cbf4bea8ef8f741b535dbd6f63_hq.jpg",
				"https://lumiere-a.akamaihd.net/v1/images/databank_naboo_01_169_6cd7e1e0.jpeg?region=0%2C0%2C1560%2C878",
				"https://static.wikia.nocookie.net/esstarwars/images/c/c7/Senate_District_ROTS.png/revision/latest?cb=20170412014018",
				"https://frikipolis.com/wp-content/uploads/2022/05/kamino.jpg"

			],
			starshipsImages: [
				"https://static.wikia.nocookie.net/esstarwars/images/b/b0/Corvette-CHRON.jpg/revision/latest?cb=20171016160544",
				"https://i.etsystatic.com/8461382/r/il/395b99/1021787906/il_1080xN.1021787906_hyhw.jpg",
				"https://fractalsponge.net/wp/wp-content/uploads/2022/02/sentinel2-scaled.jpg",
				"https://lumiere-a.akamaihd.net/v1/images/Death-Star-I-copy_36ad2500.jpeg?region=0%2C0%2C1600%2C900",
				"https://cdn.mos.cms.futurecdn.net/uciG9WygFRtEDcvw9gitTd.jpg",
				"https://lumiere-a.akamaihd.net/v1/images/Y-Wing-Fighter_0e78c9ae.jpeg?region=0%2C24%2C1536%2C768",
				"https://p.turbosquid.com/ts-thumb/p4/gieJXZ/OZ/screenshot000/png/1650377267/600x600/fit_q87/3686652c5724136118665b70438d2d82114e9663/screenshot000.jpg",
				"https://cdnb.artstation.com/p/assets/images/images/028/086/799/large/donny-versiga-sw-tie-advanced-01.jpg?1593449609",
				"https://static.wikia.nocookie.net/esstarwars/images/3/30/Executor_BF2.png/revision/latest?cb=20190810045012",
				"https://static.wikia.nocookie.net/esstarwars/images/6/67/GR-75_Medium_Transport_TAEtrivia.png/revision/latest?cb=20190128000951",

			],
			message: null,
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			]
		},
		actions: {
			getPeople: async () => {
				try {
					const resp = await fetch('https://swapi.dev/api/people');
					const data = await resp.json();
					if(!resp.ok) throw new Error('Error retrieving people');
					setStore({ people: data.results})
					localStorage.setItem('people', JSON.stringify(data.results));
					return true
				} catch (error) {
					console.log('Error retrieving people', error)
				}
			},
			getPlanets: async () => {
				try {
					const resp = await fetch('https://swapi.dev/api/planets');
					const data = await resp.json();
					if(!resp.ok) throw new Error('Error retrieving planets');
					setStore({ planets: data.results})
					localStorage.setItem('planets', JSON.stringify(data.results))
					return true
				} catch (error) {
					console.log('Error retrieving planets', error)
				}
			},
			getStarships: async () => {
				try {
					const resp = await fetch('https://swapi.dev/api/starships');
					const data = await resp.json();
					if(!resp.ok) throw new Error('Error retrieving starships');
					setStore({ starships: data.results})
					localStorage.setItem('starships', JSON.stringify(data.results))
					return true
				} catch (error) {
					console.log('Error retrieving starships, error')
				}
			},
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},

			getMessage: async () => {
				try{
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "api/hello")
					const data = await resp.json()
					setStore({ message: data.message })
					// don't forget to return something, that is how the async resolves
					return data;
				}catch(error){
					console.log("Error loading message from backend", error)
				}
			},
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			}
		}
	};
};

export default getState;
