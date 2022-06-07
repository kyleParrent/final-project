set client_min_messages to warning;

-- DANGER: this is NOT how to do it in the real world.
-- `drop schema` INSTANTLY ERASES EVERYTHING.
drop schema "public" cascade;

create schema "public";




 CREATE TABLE "public"."users" (
	"userId" serial NOT NULL,
	"username" TEXT NOT NULL UNIQUE,
	"hashedPassword" TEXT NOT NULL,
	"createdAt" timestamp with time zone NOT NULL,
	CONSTRAINT "users_pk" PRIMARY KEY ("userId")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public"."reviewedArticles" (
	"articleId" serial NOT NULL,
	"image" TEXT NOT NULL,
	"url" TEXT NOT NULL,
	"title" TEXT NOT NULL,
	"description" TEXT NOT NULL,
	"content" TEXT NOT NULL,
	"publishedAt" DATE NOT NULL,
	"source" json NOT NULL,
	CONSTRAINT "reviewedArticles_pk" PRIMARY KEY ("articleId")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public"."reviews" (
	"reviewId" serial NOT NULL,
	"articleId" int NOT NULL,
	"userId" int NOT NULL,
	"rating" TEXT NOT NULL,
	"comments" TEXT NOT NULL,
	"createdAt" timestamp with time zone NOT NULL,
	CONSTRAINT "reviews_pk" PRIMARY KEY ("reviewId")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public"."likes" (
	"userId" int NOT NULL,
	"reviewId" int NOT NULL,
	"type" BOOLEAN NOT NULL
) WITH (
  OIDS=FALSE
);





ALTER TABLE "reviews" ADD CONSTRAINT "reviews_fk0" FOREIGN KEY ("articleId") REFERENCES "reviewedArticles"("articleId");
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_fk1" FOREIGN KEY ("userId") REFERENCES "users"("userId");

ALTER TABLE "likes" ADD CONSTRAINT "likes_fk0" FOREIGN KEY ("userId") REFERENCES "users"("userId");
ALTER TABLE "likes" ADD CONSTRAINT "likes_fk1" FOREIGN KEY ("reviewId") REFERENCES "reviews"("reviewId");
