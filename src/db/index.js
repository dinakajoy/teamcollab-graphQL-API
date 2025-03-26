let games = [
  { id: "1", title: "Game plan", platform: ["Switch"] },
  { id: "2", title: "Catch the dog", platform: ["KCC, Switch"] },
  { id: "3", title: "Shoot up", platform: ["Netflix, AZE", "Youtube"] },
];

let authors = [
  { id: "1", name: "Charles", email: "charles@test.com", verified: true },
  { id: "2", name: "Andrew", email: "andrew@test.com", verified: false },
  { id: "3", name: "Angela", email: "angela@test.com", verified: true },
];

let reviews = [
  { id: "1", rating: 5, content: "I loved it", author_id: "3", game_id: "1" },
  { id: "2", rating: 2, content: "Was good", author_id: "1", game_id: "3" },
  { id: "3", rating: 4, content: "Loved it", author_id: "2", game_id: "2" },
];

export default { games, authors, reviews };
