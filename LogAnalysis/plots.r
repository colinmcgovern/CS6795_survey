library(dplyr)
library(ggplot2)

setwd("~/Documents/CS6795_survey/LogAnalysis")
data <- read.csv("out.csv")

# compare each year column
# combase 

## histograpms
data_filtered = data %>% filter(age < 100)

hist(data_filtered$pairsSolvedByEnd_year)
hist(data_filtered$pairsSolvedByEnd_year_rel)

hist(data_filtered$correctImagesFirstSeen_year)
hist(data_filtered$correctImagesFirstSeen_year_rel)

## age correlations with answer year ##

# firstCardsFlipped_year

plot_me = data %>% 
  select(age,firstCardsFlipped_year_rel) %>%
  filter(age == age) %>%
  filter(age < 100) %>%
  filter(firstCardsFlipped_year_rel != 0)

ggplot(plot_me, aes(x = age, y = firstCardsFlipped_year_rel)) +
geom_point(aes(color = factor(age)))

# firstStreak_year

plot_me = data %>% 
  select(age,firstStreak_year_rel) %>%
  filter(age == age) %>%
  filter(age < 100) %>%
  filter(firstStreak_year_rel != 0)

ggplot(plot_me, aes(x = age, y = firstStreak_year_rel)) +
  geom_point(aes(color = factor(age)))

# pairsSolvedByEnd_year

plot_me = data %>% 
  select(age,pairsSolvedByEnd_year_rel) %>%
  filter(age == age) %>%
  filter(age < 100) %>%
  filter(pairsSolvedByEnd_year_rel != 0)

lmodel <- lm(plot_me$pairsSolvedByEnd_year_rel ~ plot_me$age)
summary(lmodel)

ggplot(plot_me, aes(x = age, y = pairsSolvedByEnd_year_rel)) +
  geom_point(aes(color = factor(age))) + 
  geom_abline(intercept=coef(lmodel)[1], slope=coef(lmodel)[2])

# correctImagesFirstSeen_year

plot_me = data %>% 
  select(age,correctImagesFirstSeen_year_rel) %>%
  filter(age == age) %>%
  filter(age < 100) %>%
  filter(correctImagesFirstSeen_year_rel != 0)

lmodel <- lm(plot_me$correctImagesFirstSeen_year_rel ~ plot_me$age)
summary(lmodel)

ggplot(plot_me, aes(x = age, y = correctImagesFirstSeen_year_rel)) +
  geom_point(aes(color = factor(age))) + 
  geom_abline(intercept=coef(lmodel)[1], slope=coef(lmodel)[2])

# correctImagesByEnd_year

plot_me = data %>% 
  select(age,correctImagesByEnd_year) %>%
  filter(age == age) %>%
  filter(age < 100) %>%
  filter(correctImagesByEnd_year != 0)

ggplot(plot_me, aes(x = age, y = correctImagesByEnd_year)) +
  geom_point(aes(color = factor(age)))

# numCardsCorrect

plot_me = data %>% 
  select(age,numCardsCorrect) %>%
  filter(age == age) %>%
  filter(age < 100) %>%
  filter(numCardsCorrect != 0)

ggplot(plot_me, aes(x = age, y = numCardsCorrect)) +
  geom_point(aes(color = factor(age)))

# numImagesCorrect

plot_me = data %>% 
  select(age,numImagesCorrect) %>%
  filter(age == age) %>%
  filter(age < 100) %>%
  filter(numImagesCorrect != 0)

ggplot(plot_me, aes(x = age, y = numImagesCorrect)) +
  geom_point(aes(color = factor(age)))


## gender correlations with answer year ##

# firstCardsFlipped_year

plot_me = data %>% 
  select(gender,firstCardsFlipped_year_rel) %>%
  filter(firstCardsFlipped_year_rel > -100) %>%
  filter(gender == gender) %>%
  filter(firstCardsFlipped_year_rel != 0)

ggplot(plot_me, aes(x = as.factor(gender), y = firstCardsFlipped_year_rel)) +
  geom_point(aes(color = factor(gender)))

# firstStreak_year

plot_me = data %>% 
  select(gender,firstStreak_year_rel) %>%
  filter(firstStreak_year_rel > -100) %>%
  filter(gender == gender) %>%
  filter(firstStreak_year_rel != 0)

ggplot(plot_me, aes(x = as.factor(gender), y = firstStreak_year_rel)) +
  geom_point(aes(color = factor(gender)))

t.test(firstStreak_year_rel ~ gender, data = plot_me, var.equal = TRUE)

# pairsSolvedByEnd_year

plot_me = data %>% 
  select(gender,pairsSolvedByEnd_year_rel) %>%
  filter(pairsSolvedByEnd_year_rel > -100) %>%
  filter(gender == gender) %>%
  filter(pairsSolvedByEnd_year_rel != 0)

ggplot(plot_me, aes(x = as.factor(gender), y = pairsSolvedByEnd_year_rel)) +
  geom_point(aes(color = factor(gender)))

t.test(pairsSolvedByEnd_year_rel ~ gender, data = plot_me, var.equal = TRUE)

# correctImagesFirstSeen_year

plot_me = data %>% 
  select(gender,correctImagesFirstSeen_year_rel, age) %>%
  filter(correctImagesFirstSeen_year_rel > -100) %>%
  filter(age == age) %>%
  filter(gender == gender) %>%
  filter(correctImagesFirstSeen_year_rel != 0)

ggplot(plot_me, aes(x = as.factor(gender), y = correctImagesFirstSeen_year_rel)) +
  geom_point(aes(color = factor(age)))

# correctImagesByEnd_year

plot_me = data %>% 
  select(gender,correctImagesByEnd_year_rel) %>%
  filter(correctImagesByEnd_year_rel > -100) %>%
  filter(gender == gender) %>%
  filter(correctImagesByEnd_year_rel != 0)

ggplot(plot_me, aes(x = as.factor(gender), y = correctImagesByEnd_year_rel)) +
  geom_point(aes(color = factor(gender)))

# numCardsCorrect

plot_me = data %>% 
  select(gender,numCardsCorrect) %>%
  filter(gender == gender) %>%
  filter(numCardsCorrect != 0)

ggplot(plot_me, aes(x = as.factor(gender), y = numCardsCorrect)) +
  geom_point(aes(color = factor(gender)))

# numImagesCorrect

plot_me = data %>% 
  select(gender,numImagesCorrect) %>%
  filter(gender == gender) %>%
  filter(numImagesCorrect != 0)

ggplot(plot_me, aes(x = as.factor(gender), y = numImagesCorrect)) +
  geom_point(aes(color = factor(gender)))

## politics ## 

# firstCardsFlipped_year

plot_me = data %>% 
  select(politicalParty,firstCardsFlipped_year_rel) %>%
  filter(firstCardsFlipped_year_rel > -100) %>%
  filter(politicalParty == politicalParty) %>%
  filter(politicalParty != "libertarian") %>%
  filter(politicalParty != "other") %>%
  filter(firstCardsFlipped_year_rel != 0)

ggplot(plot_me, aes(x = as.factor(politicalParty), y = firstCardsFlipped_year_rel)) +
  geom_point(aes(color = factor(politicalParty)))

t.test(firstCardsFlipped_year_rel ~ politicalParty, data = plot_me, var.equal = TRUE)

# firstCardsFlipped_year

plot_me = data %>% 
  select(politicalParty,firstStreak_year_rel) %>%
  filter(firstStreak_year_rel > -100) %>%
  filter(politicalParty == politicalParty) %>%
  filter(politicalParty != "libertarian") %>%
  filter(politicalParty != "other") %>%
  filter(firstStreak_year_rel != 0)

ggplot(plot_me, aes(x = as.factor(politicalParty), y = firstStreak_year_rel)) +
  geom_point(aes(color = factor(politicalParty)))

t.test(firstStreak_year_rel ~ politicalParty, data = plot_me, var.equal = TRUE)

# pairsSolvedByEnd_year (maybe significant, check relative)

plot_me = data %>% 
  select(politicalParty,pairsSolvedByEnd_year) %>%
  filter(politicalParty == politicalParty) %>%
  filter(politicalParty != "libertarian") %>%
  filter(politicalParty != "other") %>%
  filter(politicalParty != "") %>%
  filter(pairsSolvedByEnd_year != 0)

ggplot(plot_me, aes(x = as.factor(politicalParty), y = pairsSolvedByEnd_year)) +
  geom_point(aes(color = factor(politicalParty)))

t.test(pairsSolvedByEnd_year ~ politicalParty, data = plot_me, var.equal = TRUE)

# correctImagesFirstSeen_year

plot_me = data %>% 
  select(politicalParty,correctImagesFirstSeen_year_rel, age) %>%
  filter(age == age) %>%
  filter(correctImagesFirstSeen_year_rel > -100) %>%
  filter(politicalParty == politicalParty) %>%
  filter(politicalParty != "libertarian") %>%
  filter(politicalParty != "other") %>%
  filter(politicalParty != "") %>%
  filter(correctImagesFirstSeen_year_rel != 0)

ggplot(plot_me, aes(x = as.factor(politicalParty), y = correctImagesFirstSeen_year_rel)) +
  geom_point(aes(color = factor(age)))

# correctImagesByEnd_year (maybe significant, check relative)

plot_me = data %>% 
  select(politicalParty,correctImagesByEnd_year) %>%
  filter(politicalParty == politicalParty) %>%
  filter(correctImagesByEnd_year != 0)

ggplot(plot_me, aes(x = as.factor(politicalParty), y = correctImagesByEnd_year)) +
  geom_point(aes(color = factor(politicalParty)))

# numCardsCorrect

plot_me = data %>% 
  select(politicalParty,numCardsCorrect) %>%
  filter(politicalParty == politicalParty) %>%
  filter(numCardsCorrect != 0)

ggplot(plot_me, aes(x = as.factor(politicalParty), y = numCardsCorrect)) +
  geom_point(aes(color = factor(politicalParty)))

# numImagesCorrect

plot_me = data %>% 
  select(politicalParty,numImagesCorrect) %>%
  filter(politicalParty == politicalParty) %>%
  filter(numImagesCorrect != 0)

ggplot(plot_me, aes(x = as.factor(politicalParty), y = numImagesCorrect)) +
  geom_point(aes(color = factor(politicalParty)))

## education level ## 

# firstCardsFlipped_year

plot_me = data %>% 
  select(educationLevel,firstCardsFlipped_year) %>%
  filter(educationLevel == educationLevel) %>%
  filter(firstCardsFlipped_year != 0)

ggplot(plot_me, aes(x = as.factor(educationLevel), y = firstCardsFlipped_year)) +
  geom_point(aes(color = factor(educationLevel)))

# firstStreak_year

plot_me = data %>% 
  select(educationLevel,firstStreak_year_rel) %>%
  filter(firstStreak_year_rel > -100) %>%
  filter(educationLevel == educationLevel) %>%
  filter(educationLevel != "high-school") %>%
  filter(firstStreak_year_rel != 0)

ggplot(plot_me, aes(x = as.factor(educationLevel), y = firstStreak_year_rel)) +
  geom_point(aes(color = factor(educationLevel)))

t.test(firstStreak_year_rel ~ educationLevel, data = plot_me, var.equal = TRUE)

# pairsSolvedByEnd_year

plot_me = data %>% 
  select(educationLevel,pairsSolvedByEnd_year_rel) %>%
  filter(pairsSolvedByEnd_year_rel > -100) %>%
  filter(educationLevel == educationLevel) %>%
  filter(pairsSolvedByEnd_year_rel != 0)

ggplot(plot_me, aes(x = as.factor(educationLevel), y = pairsSolvedByEnd_year_rel)) +
  geom_point(aes(color = factor(educationLevel)))

# correctImagesFirstSeen_year

plot_me = data %>% 
  select(educationLevel,correctImagesFirstSeen_year_rel, age) %>%
  filter(age == age) %>%
  filter(age < 100) %>%
  filter(educationLevel == educationLevel) %>%
  filter(correctImagesFirstSeen_year_rel != 0)

ggplot(plot_me, aes(x = as.factor(educationLevel), y = correctImagesFirstSeen_year_rel)) +
  geom_point(aes(color = factor(age)))

# correctImagesByEnd_year

plot_me = data %>% 
  select(educationLevel,correctImagesByEnd_year) %>%
  filter(educationLevel == educationLevel) %>%
  filter(correctImagesByEnd_year != 0)

ggplot(plot_me, aes(x = as.factor(educationLevel), y = correctImagesByEnd_year)) +
  geom_point(aes(color = factor(educationLevel)))

# numCardsCorrect

plot_me = data %>% 
  select(educationLevel,numCardsCorrect) %>%
  filter(educationLevel == educationLevel) %>%
  filter(numCardsCorrect != 0)

ggplot(plot_me, aes(x = as.factor(educationLevel), y = numCardsCorrect)) +
  geom_point(aes(color = factor(educationLevel)))

# numImagesCorrect

plot_me = data %>% 
  select(educationLevel,numImagesCorrect) %>%
  filter(educationLevel == educationLevel) %>%
  filter(numImagesCorrect != 0)

ggplot(plot_me, aes(x = as.factor(educationLevel), y = numImagesCorrect)) +
  geom_point(aes(color = factor(educationLevel)))

## ethnicity ##

## martial yes, no ##

# age 
plot_me = data %>% 
  select(maritalStatus,age) %>%
  filter(age < 100) %>%
  filter(maritalStatus == maritalStatus)

ggplot(plot_me, aes(x = as.factor(maritalStatus), y = age)) +
  geom_point(aes(color = factor(maritalStatus)))

t.test(age ~ maritalStatus, data = plot_me, var.equal = TRUE)

# firstCardsFlipped_year

plot_me = data %>% 
  select(maritalStatus,firstCardsFlipped_year) %>%
  filter(maritalStatus == maritalStatus) %>%
  filter(firstCardsFlipped_year != 0)

ggplot(plot_me, aes(x = as.factor(maritalStatus), y = firstCardsFlipped_year)) +
  geom_point(aes(color = factor(maritalStatus)))

# firstStreak_year

plot_me = data %>% 
  select(maritalStatus,firstStreak_year_rel) %>%
  filter(firstStreak_year_rel > -100) %>%
  filter(maritalStatus == maritalStatus) %>%
  filter(firstStreak_year_rel != 0)

ggplot(plot_me, aes(x = as.factor(maritalStatus), y = firstStreak_year_rel)) +
  geom_point(aes(color = factor(maritalStatus)))

t.test(firstStreak_year_rel ~ maritalStatus, data = plot_me, var.equal = TRUE)

# pairsSolvedByEnd_year

plot_me = data %>% 
  select(maritalStatus,pairsSolvedByEnd_year_rel, age) %>%
  filter(pairsSolvedByEnd_year_rel > -100) %>%
  filter(maritalStatus == maritalStatus) %>%
  filter(pairsSolvedByEnd_year_rel != 0)

ggplot(plot_me, aes(x = as.factor(maritalStatus), y = pairsSolvedByEnd_year_rel)) +
  geom_point(aes(color = factor(age))) 

t.test(pairsSolvedByEnd_year_rel ~ maritalStatus, data = plot_me, var.equal = TRUE)

# correctImagesFirstSeen_year

plot_me = data %>% 
  select(maritalStatus,correctImagesFirstSeen_year, age) %>%
  filter(age == age) %>%
  filter(maritalStatus == maritalStatus) %>%
  filter(correctImagesFirstSeen_year != 0)

ggplot(plot_me, aes(x = as.factor(maritalStatus), y = correctImagesFirstSeen_year)) +
  geom_point(aes(color = factor(age)))

# correctImagesByEnd_year (maybe significant, check relative)

plot_me = data %>% 
  select(maritalStatus,correctImagesByEnd_year) %>%
  filter(maritalStatus == maritalStatus) %>%
  filter(correctImagesByEnd_year != 0)

ggplot(plot_me, aes(x = as.factor(maritalStatus), y = correctImagesByEnd_year)) +
  geom_point(aes(color = factor(maritalStatus)))

# numCardsCorrect

plot_me = data %>% 
  select(maritalStatus,numCardsCorrect) %>%
  filter(maritalStatus == maritalStatus) %>%
  filter(numCardsCorrect != 0)

ggplot(plot_me, aes(x = as.factor(maritalStatus), y = numCardsCorrect)) +
  geom_point(aes(color = factor(maritalStatus)))

# numImagesCorrect

plot_me = data %>% 
  select(maritalStatus,numImagesCorrect) %>%
  filter(maritalStatus == maritalStatus) %>%
  filter(numImagesCorrect != 0)

ggplot(plot_me, aes(x = as.factor(maritalStatus), y = numImagesCorrect)) +
  geom_point(aes(color = factor(maritalStatus)))

## gaming frequency (number) ##

# pairsSolvedByEnd_year

plot_me = data %>% 
  select(gamingFrequency,pairsSolvedByEnd_year_rel) %>%
  filter(gamingFrequency == gamingFrequency) %>%
  filter(pairsSolvedByEnd_year_rel != 0) %>%
  filter(pairsSolvedByEnd_year_rel> -100)

ggplot(plot_me, aes(x = as.factor(gamingFrequency), y = pairsSolvedByEnd_year_rel)) +
  geom_point(aes(color = factor(gamingFrequency)))

# correctImagesFirstSeen_year

plot_me = data %>% 
  select(gamingFrequency,correctImagesFirstSeen_year_rel, age) %>%
  filter(age == age) %>%
  filter(gamingFrequency == gamingFrequency) %>%
  filter(correctImagesFirstSeen_year_rel != 0) %>%
  filter(correctImagesFirstSeen_year_rel> -100)

ggplot(plot_me, aes(x = as.factor(gamingFrequency), y = correctImagesFirstSeen_year_rel)) +
  geom_point(aes(color = factor(age)))

## future outlook (number) ##

# pairsSolvedByEnd_year

plot_me = data %>% 
  select(futureOutlook,pairsSolvedByEnd_year_rel) %>%
  filter(futureOutlook == futureOutlook) %>%
  filter(pairsSolvedByEnd_year_rel != 0) %>%
  filter(pairsSolvedByEnd_year_rel > -100)

ggplot(plot_me, aes(x = as.factor(futureOutlook), y = pairsSolvedByEnd_year_rel)) +
  geom_point(aes(color = factor(futureOutlook)))

# correctImagesFirstSeen_year

plot_me = data %>% 
  select(futureOutlook,correctImagesFirstSeen_year_rel, age) %>%
  filter(age == age) %>%
  filter(futureOutlook == futureOutlook) %>%
  filter(correctImagesFirstSeen_year_rel != 0) %>%
  filter(correctImagesFirstSeen_year_rel > -100)

ggplot(plot_me, aes(x = as.factor(futureOutlook), y = correctImagesFirstSeen_year_rel)) +
  geom_point(aes(color = factor(age)))

# n-points

# age

plot_me = data %>% 
  select(n.points,age) %>%
  filter(n.points == n.points) %>%
  filter(n.points > 0) %>%
  filter(n.points < 30) %>%
  filter(age == age) %>%
  filter(age < 100)

ggplot(plot_me, aes(x = age, y = n.points)) +
  geom_point(aes(color = factor(n.points))) + 
  geom_smooth(aes(age,n.points), method="lm", se=F)

lmodel <- lm(plot_me$age ~ plot_me$n.points)
summary(lmodel)

# pairsSolvedByEnd_year

plot_me = data %>% 
  select(n.points,pairsSolvedByEnd_year_rel) %>%
  filter(n.points == n.points) %>%
  filter(pairsSolvedByEnd_year_rel > -100) %>%
  filter(pairsSolvedByEnd_year_rel != 0)

lmodel <- lm(plot_me$pairsSolvedByEnd_year_rel ~ plot_me$n.points)
summary(lmodel)

ggplot(plot_me, aes(x = n.points, y = pairsSolvedByEnd_year_rel)) +
  geom_point(aes(color = factor(n.points)))

# correctImagesFirstSeen_year

plot_me = data %>% 
  select(n.points,correctImagesFirstSeen_year_rel) %>%
  filter(n.points == n.points) %>%
  filter(n.points != 0) %>%
  filter(correctImagesFirstSeen_year_rel != 0) %>%
  filter(correctImagesFirstSeen_year_rel > -100)

lmodel <- lm(plot_me$correctImagesFirstSeen_year_rel ~ plot_me$n.points)
summary(lmodel)

ggplot(plot_me, aes(x = n.points, y = correctImagesFirstSeen_year_rel)) +
  geom_point(aes(color = factor(n.points))) + 
  geom_abline(intercept=coef(lmodel)[1], slope=coef(lmodel)[2])

# numCardsCorrect

plot_me = data %>% 
  select(n.points,numCardsCorrect) %>%
  filter(n.points == n.points) %>%
  filter(numCardsCorrect != 0)

ggplot(plot_me, aes(x = n.points, y = numCardsCorrect)) +
  geom_point(aes(color = factor(n.points)))

# numImagesCorrect

plot_me = data %>% 
  select(n.points,numImagesCorrect) %>%
  filter(n.points == n.points) %>%
  filter(numImagesCorrect != 0)

ggplot(plot_me, aes(x = n.points, y = numImagesCorrect)) +
  geom_point(aes(color = factor(n.points)))

lmodel <- lm(plot_me$numImagesCorrect ~ plot_me$n.points)
summary(lmodel)
