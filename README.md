# 🏝️ Fairy-Tale Island 🏝️
![image](https://github.com/GDSC-CAU/FTIsland-BE/assets/81238093/f99316f4-59f0-460b-a0cd-356fd96c553b)
(간단한 설명)
### Demo video

## 📌 Project Overview

We noted **the phenomenon of poor pre-school language education for children when their primary caregivers are poor at the language of their country of residence in an era where there are many multicultural families.** In multicultural families, the subject of language education is children and primary caregivers.

**We provide a fairy tale reading service that allows main caregivers and children to bond with each other and acquire language and culture of their country of residence.**

## 📌 Problem

According to a national survey of multicultural families conducted in Korea in 2021, the biggest difficulty in raising children was Korean language instruction (26.8%) for those under the age of 5 and learning instruction (50.4%) for those over the age of 6.

In a typical family, the caregiver is proficient in the language, so the child is naturally able to acquire it. However, in a multicultural family, the primary caregiver is less likely to acquire a language because the primary caregiver may be inexperienced in the language of the country of residence. The degree of language learning also has a significant impact on pre-school children's educational attainment.

## 📌 Solution

Children's storybooks read by their parents in childhood have excellent language learning effects. So, with this in mind, we propose a "dual language storybook" solution that enables both children and primary caregivers to naturally learn languages in multicultural families.

We have chosen **high quality education** among the UN's sustainable development goals, and the specific goal is **4.2 Equal Access to Quality Pre-school Education.**

Caregivers can read fairy tale books with their children to acquire culture and language, and learn words. After reading the fairy tale books, the "Think" question allows them to think deeply about the contents of the fairy tale and induce them to interpret them in their own way for social learning. It also allows caregivers and children to bond by having conversations about the book.

## 📌 Architecture
![image](https://github.com/GDSC-CAU/FTIsland-BE/assets/81238093/5f40878e-c43b-4642-8406-0ce5375903b2)


### Google Products
- Google Cloud Platform
- Google Cloud Storage (Bucket)
- Google Cloud SQL
- Google translation API
- Google text to speech API

## 📌 Start Guide

## Front-end

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


## Back-end

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


## 📌 Screen Shots

## 📌 Next Steps

1. Currently, it is for multicultural families living in Korea, and registered fairy tales are mainly for traditional fairy tales in Korea. In order to target more multicultural families in more countries, many traditional fairy tales from various countries will be registered. Traditional fairy tales allow you to feel the culture or customs of a country, and if there are traditional fairy tales from various countries, you can understand the culture by reading fairy tales about your parents' home country.

2. In a multicultural family, a child's poor language proficiency due to the language proficiency of the main caregiver can also be resolved through drawing. While drawing about keywords, you can naturally acquire words and form a bond by drawing together. In the future, we will add a function of drawing fairy tale illustrations by using our own imagination about the contents of the fairy tale.

3. The current version of the solution offers only Korean, English, Japanese, and Chinese, but the backend code provides both languages from countries provided by the Google translation API, so adding a country to the main/subordinate language option can support many countries without additional memory consumption or code modification.

## 📌 Contributors

| Minkyeong Kim | Yunjin Kim | Youngeun Jun | Seungwon Choi |
| --- | --- | --- | --- |
| <img src="https://github.com/GDSC-CAU/FTIsland-BE/assets/80468377/718adbac-97b2-4f1b-a312-4143108c8dd4" width="150" /> | <img src="https://github.com/GDSC-CAU/FTIsland-BE/assets/81238093/395dcbea-2778-47d8-ad97-8566606e029a" width="150" /> | <img src="https://github.com/GDSC-CAU/FTIsland-BE/assets/33658057/50800865-b2d0-4187-9a56-093453c18e92" width="150" /> | <img src="https://github.com/GDSC-CAU/FTIsland-BE/assets/33658057/b6934dab-2bba-4533-982d-847684b9fcfe" width="150" /> |
| Back-end / AI | Server / Back-end | Front-end / Design | Front-end / Design |



