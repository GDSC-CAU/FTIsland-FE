# 🏝️ Fairy-Tale Island 🏝️
![image](https://github.com/GDSC-CAU/FTIsland-BE/assets/81238093/f99316f4-59f0-460b-a0cd-356fd96c553b)

## 📌 Project Overview

We noted **the phenomenon of poor pre-school language education for children when their primary caregivers are poor at the language of their country of residence in an era where there are many multicultural families.** In multicultural families, the subject of language education is children and primary caregivers.

**We provide a fairy tale reading service that allows main caregivers and children to bond with each other and acquire language and culture of their country of residence.**

## 📌 Problem

According to a national survey of multicultural families conducted in Korea in 2021, the biggest difficulty in raising children was Korean language instruction (26.8%) for those under the age of 5 and learning instruction (50.4%) for those over the age of 6.

In a typical family, the caregiver is proficient in the language, so the child is naturally able to acquire it. However, in a multicultural family, the primary caregiver is less likely to acquire a language because the primary caregiver may be inexperienced in the language of the country of residence. The degree of language learning also has a significant impact on pre-school children's educational attainment.

## 📌 Solution

Children's storybooks read by their parents in childhood have excellent language learning effects. So, with this in mind, we propose a ${\textsf{\color{#39A7FF}"Dual Language Storybook"}}$ solution that enables both children and primary caregivers to naturally learn languages in multicultural families.

We have chosen **high quality education** among the UN's sustainable development goals, and the specific goal is ${\textsf{\color{#39A7FF}4.2 Equal Access to Quality Pre-school Education.}}$

Caregivers can read fairy tale books with their children to acquire culture and language, and learn words. After reading the fairy tale books, the "Think" question allows them to think deeply about the contents of the fairy tale and induce them to interpret them in their own way for social learning. It also allows caregivers and children to bond by having conversations about the book.

There are four areas for indicators at the United Nations to see if children's development is on track. **Our solution sought to improve in terms of literacy and social/emotional learning among the four.**

Reading fairy tales with parents naturally helps them learn about letters and improve their reading skills. Also, think-about questions can induce conversations between parents and children, forming an emotional bond. Social learning is possible through social thinking, while thinking about the contents of fairy tales to answer questions.

1. One of the ways preschoolers learn a language is "reading fairy tales together." Using our solution, the primary caregiver can also read fairy tales, learn words, and practice pronunciation with a guide through TTS. This allows the primary caregiver to read fairy tales to children, too.
  - [Min Kyung-min and Soohyang Kim (2022). Effects of Repetitive Picture Book Reading Activities on Children's Reading Motivation and Reading Interest. Research on Children's Literature Education, 23 (2), 71-101.](https://www.kci.go.kr/kciportal/ci/sereArticleSearch/ciSereArtiView.kci?sereArticleSearchBean.artiId=ART002860131)
  - [Kim Hong-mi. (Date of opening). Effect of family-linked picture book reading activities on children's language expression and creative problem-solving skills. Korean Open Early Childhood Education Association's academic conference thesis collection, venue.](https://www.dbpia.co.kr/Journal/articleDetail?nodeId=NODE11472308)

2. Our solution allows us to read fairy tales together and provide "think" questions to create conversational topics, and to communicate and bond by sharing stories about fairy tales together.
  - [Song Myung-hee, Kim Min-jin (2010). The effect of speech play activities on children's vocabulary and reading attitudes after reading picture books. Educational science research, 41 (2), 83-113.](https://www.dbpia.co.kr/Journal/articleDetail?nodeId=NODE01791149)
  - [Kim Jung-won, Nam Kyu. (2009). Response patterns of migrant women from multicultural families expressed during the application of picture book reading programs. Children's Literature Education Research, 10 (2), 73-103.](https://www.dbpia.co.kr/Journal/articleDetail?nodeId=NODE07554024)

## 📌 [Demo Video](https://www.youtube.com/watch?v=JJYhN3-Z-0M)
https://github.com/GDSC-CAU/FTIsland-FE/assets/33658057/e536d620-4f61-401a-a3de-317e4ffd34b0

## 📌 Architecture
![image](https://github.com/GDSC-CAU/FTIsland-BE/assets/81238093/5f40878e-c43b-4642-8406-0ce5375903b2)


### ${\textsf{\color{#4285f4}G}\textsf{\color{#ea4335}o}\textsf{\color{#fbbc05}o}\textsf{\color{#4285f4}g}\textsf{\color{#34a853}l}\textsf{\color{#ea4335}e}}$ Products
- Google Cloud Platform
- Google Cloud Storage (Bucket)
- Google Cloud SQL
- Google translation API
- Google text to speech API

## 📌 Start Guide

## 🖥 [Front-end](https://github.com/GDSC-CAU/FTIsland-FE)

### Requirements
Before getting started, ensure you have the following installed:

- Node.js
- npm (Node Package Manager)

### Install and Clone
1. Clone the Repository:

```
git clone https://github.com/GDSC-CAU/FTIsland-FE.git
```

2. Change Directory:

```
cd FTIsland-FE
```

3. Install Dependencies:

```
npm install
```

### Environment Variables Setup
1. Create a .env.local File
- Create a .env.local file in the root directory of your project.

2. Set Environment Variables
- Set the required environment variables in the .env file. For example:

```
NEXT_PUBLIC_GOOGLE_CLOUD_API_KEY={ /* Your gcp key */ }
NEXT_PUBLIC_SERVER_URL=http://localhost:8080
```

### Run
To run the front-end application, follow these steps:

1. Development Mode:

```
npm dev
```

2. Test
- Open http://localhost:3000 with your browser to see the result.


## 🖥 [Back-end](https://github.com/GDSC-CAU/FTIsland-BE)

### Requirements
Before getting started, ensure you have the following installed:

- MySQL
- Java (JDK17)
- IntelliJ IDEA

### Install and Clone
- Clone the Repository:

```
git clone https://github.com/GDSC-CAU/FTIsland-BE.git
```
- Open
1. In IntelliJ IDEA, open the folder for that clone path and select the "build.gradle" file to open it.
2. When the gradle plug-in elephant appears, press it to add dependency.
3. If you have a build problem, change to Build Tools in settings: IntelliJIDEA -> Gradle or vice versa.
4. If you still have a problem, set the gradle JVM version to 17.


### Environment Variables Setup
1. You must enter the API Key in the yml file to run. Running as it is may not support some of the features.
2. The mysql setting must be as follows.

- In mySQL workbench, set the root user's password to 0000.
```
mysql -u root
```
```
set password = password('0000');
```

- Create database under the name 'ft'
```
create database ft;
```
### Run
- In "com.FTIsland.BE" folder, Run "BeApplication" file.
- Test </br>
  Open http://localhost:8080 or use the POSTMAN to check the api operation.


## 📌 Fairy-Tale Island

### You can explore more about [🏝️ Fairy-Tale Island 🏝️](https://fairy-tale-island.vercel.app/)

Sample books from [here](http://www.fantass.com/picturebook/330).

| Main Page | Side Menu | 
| --- | --- | 
| <img src="https://github.com/RumosZin/FTIsland-BE/assets/81238093/d5b263eb-6acc-482b-abac-4d5a57e4333b" width="500" /> | <img src="https://github.com/RumosZin/FTIsland-BE/assets/81238093/7ba884e8-4902-4374-a760-ed37b31d758d" width="500" /> | 

| Book Title | Book Contents | 
| --- | --- | 
| <img src="https://github.com/RumosZin/FTIsland-BE/assets/81238093/5342c51d-9c4d-48ef-a3ff-fe7d79108475" width="500" /> | <img src="https://github.com/RumosZin/FTIsland-BE/assets/81238093/e05ce291-71e5-43b7-b922-ef24a45b9362" width="500" /> | 

| My Stories | Vocabulary | 
| --- | --- | 
| <img src="https://github.com/RumosZin/FTIsland-BE/assets/81238093/e7f0537d-545d-45a2-a574-2d9b409776fd" width="500" /> | <img src="https://github.com/RumosZin/FTIsland-BE/assets/81238093/5352a048-4654-421e-b521-730b7e0fb261" width="500" /> | 




## 📌 Next Steps

1. Currently, it is for multicultural families living in Korea, and registered fairy tales are mainly for traditional fairy tales in Korea. In order to target more multicultural families in more countries, many traditional fairy tales from various countries will be registered. Traditional fairy tales allow you to feel the culture or customs of a country, and if there are traditional fairy tales from various countries, you can understand the culture by reading fairy tales about your parents' home country.

2. In a multicultural family, a child's poor language proficiency due to the language proficiency of the main caregiver can also be resolved through drawing. While drawing about keywords, you can naturally acquire words and form a bond by drawing together. In the future, we will add a function of drawing fairy tale illustrations by using our own imagination about the contents of the fairy tale.

3. The current version of the solution offers only Korean, English, Japanese, and Chinese, but the backend code provides both languages from countries provided by the Google translation API, so adding a country to the main/subordinate language option can support many countries without additional memory consumption or code modification.

## 📌 Contributors

| [Minkyeong Kim](https://github.com/alsrudrl1220) | [Yunjin Kim](https://github.com/RumosZin) | [Youngeun Jun](https://github.com/Junyewdd) | [Seungwon Choi](https://github.com/seung1) |
| --- | --- | --- | --- |
| <img src="https://github.com/GDSC-CAU/FTIsland-BE/assets/80468377/718adbac-97b2-4f1b-a312-4143108c8dd4" width="150" /> | <img src="https://github.com/GDSC-CAU/FTIsland-BE/assets/81238093/395dcbea-2778-47d8-ad97-8566606e029a" width="150" /> | <img src="https://github.com/GDSC-CAU/FTIsland-BE/assets/33658057/50800865-b2d0-4187-9a56-093453c18e92" width="150" /> | <img src="https://github.com/GDSC-CAU/FTIsland-BE/assets/33658057/b6934dab-2bba-4533-982d-847684b9fcfe" width="150" /> |
| Back-end / AI / Video | Server / Back-end | Front-end / Design | Front-end / Design |



