export async function seedDatabase(firebase) {
    const users = [
      {
        userId: 'fsmq9yHdECY3BvXsP0JdeltUVe12',
        username: 'thienduy',
        fullName: 'Duy Vo',
        emailAddress: 'thienduyyy@gmail.com',
        following: ['2'],
        followers: ['2', '3', '4'],
        dateCreated: Date.now()
      },
      {
        userId: '2',
        username: 'leomessi',
        fullName: 'Lionel Andrés Messi',
        emailAddress: 'messi@leo.com',
        following: [],
        followers: ['fsmq9yHdECY3BvXsP0JdeltUVe12'],
        dateCreated: Date.now()
      },
      {
        userId: '3',
        username: 'salah',
        fullName: 'Mohamed Salah Hamed Mahrous Ghaly',
        emailAddress: 'salah@mohamed.com',
        following: [],
        followers: ['fsmq9yHdECY3BvXsP0JdeltUVe12'],
        dateCreated: Date.now()
      },
      {
        userId: '4',
        username: 'neymarjr',
        fullName: 'Neymar da Silva Santos Júnior',
        emailAddress: 'neymar@santos.com',
        following: [],
        followers: ['fsmq9yHdECY3BvXsP0JdeltUVe12'],
        dateCreated: Date.now()
      },
      {
        userId: '5',
        username: 'thiago',
        fullName: 'Thiago Alcantara',
        emailAddress: 'thiago@alcantara.com',
        following: [],
        followers: ['fsmq9yHdECY3BvXsP0JdeltUVe12'],
        dateCreated: Date.now()
      },
      {
        userId: '6',
        username: 'bale',
        fullName: 'Gareth Bale',
        emailAddress: 'bale@gareth.com',
        following: [],
        followers: ['fsmq9yHdECY3BvXsP0JdeltUVe12'],
        dateCreated: Date.now()
      }
    ];

    for (let k = 0; k < users.length; k++) {
      firebase.firestore().collection('users').add(users[k]);
    }

    for (let i = 1; i <= 5; ++i) {
      firebase
        .firestore()
        .collection('photos')
        .add({
          photoId: i,
          userId: '5',
          imageSrc: `/images/users/thiago/${i}.jpg`,
          caption: 'Balling',
          likes: [],
          comments: [
            {
              displayName: 'salah',
              comment: 'Good match'
            },
            {
              displayName: 'neymarjr',
              comment: 'Good to see u back'
            }
          ],
          userLatitude: '40.7128°',
          userLongitude: '74.0060°',
          dateCreated: Date.now()
        });
    }
    for (let i = 6; i <= 9; ++i) {
      firebase
        .firestore()
        .collection('photos')
        .add({
          photoId: i,
          userId: '2',
          imageSrc: `/images/users/leomessi/${i}.jpg`,
          caption: 'Good match',
          likes: [],
          comments: [
            {
              displayName: 'neymarjr',
              comment: 'tu calcitrare bonum'
            },
            {
              displayName: 'salah',
              comment: 'GOAT'
            }
          ],
          userLatitude: '40.7128°',
          userLongitude: '74.0060°',
          dateCreated: Date.now()
        });
    }
    for (let i = 10; i <= 12; ++i) {
      firebase
        .firestore()
        .collection('photos')
        .add({
          photoId: i,
          userId: '3',
          imageSrc: `/images/users/salah/${i}.jpg`,
          caption: 'You"ll never walk alone',
          likes: [],
          comments: [
            {
              displayName: 'thiago',
              comment: 'U are insane'
            },
            {
              displayName: 'bale',
              comment: 'Well deserved'
            }
          ],
          userLatitude: '40.7128°',
          userLongitude: '74.0060°',
          dateCreated: Date.now()
        });
    }
    for (let i = 13; i <= 16; ++i) {
      firebase
        .firestore()
        .collection('photos')
        .add({
          photoId: i,
          userId: '6',
          imageSrc: `/images/users/bale/${i}.jpg`,
          caption: 'That was fun',
          likes: [],
          comments: [
            {
              displayName: 'neymarjr',
              comment: 'Fastest man alive'
            },
            {
              displayName: 'salah',
              comment: 'More to come Gareth'
            }
          ],
          userLatitude: '40.7128°',
          userLongitude: '74.0060°',
          dateCreated: Date.now()
        });
    }
    for (let i = 17; i <= 22; ++i) {
      firebase
        .firestore()
        .collection('photos')
        .add({
          photoId: i,
          userId: '4',
          imageSrc: `/images/users/neymarjr/${i}.jpg`,
          caption: 'Quando viu noix passa fez assim',
          likes: [],
          comments: [
            {
              displayName: 'messi',
              comment: 'Falou assim que preto lindo '
            },
            {
              displayName: 'thiago',
              comment: 'Sabe muito'
            }
          ],
          userLatitude: '40.7128°',
          userLongitude: '74.0060°',
          dateCreated: Date.now()
        });
    }
  }
  