insert into "reviewedArticles" ("imageUrl",
	"originalUrl",
	"title",
	"shortDescription",
	"content",
	"articleDate",
	"source")
values ('https://www.slashgear.com/img/gallery/how-scientists-plan-to-use-fiber-optic-technology-to-detect-earthquakes-and-tides/l-intro-1653680998.jpg',
 'https://www.slashgear.com/879839/how-scientists-plan-to-use-fiber-optic-technology-to-detect-earthquakes-and-tides/',
 'How Scientists Plan To Use Fiber Optic Technology To Detect Earthquakes And Tides',
 'The miles of fiber optic cable on the ocean floor may be the key to understanding and predicting earthquakes and tsunamis.',
 'How Scientists Plan To Use Fiber Optic Technology To Detect Earthquakes And Tides\nEvery year, about 20,000 earthquakes are registered around the world; this means roughly 55 every day, shaking Earths crust',
 '2022-05-31T17:14:00Z',
 'SlashGear');

insert into "users" ("username",
	"hashedPassword",
	"createdAt")
values ('TimTim', '12345n', now());

insert into "reviews" ("articleId",
	"userId",
	"likes",
	"dislikes",
	"rating",
	"comments",
  "createdAt")
values ('1', '1', '10', '5', 'true', 'I liked this article but you could also say I hated it too.', now());
