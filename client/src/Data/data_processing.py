import matplotlib.pyplot as plt
import numpy as np
import pandas as pd
import random

data_ori = pd.read_csv("client/src/Data/data_ori.csv", encoding='utf-8')
y_distribution_samples = []
sigma, size = 1000, 20

# y_mean = data_ori['y'].mean()
# new_ys = []
# lambd = 1 / y_mean
# for i in range(4):  
#         temp1 = random.expovariate(lambd) 
#         new_ys.append(temp1)

# plt.hist(new_ys, bins = 200)  
# plt.show() 

# ---------------------------------------------
# Gaussian distribution

for mu in data_ori['y']: # original
# for mu in new_ys: # Exponential
    temp = np.random.normal(mu, sigma, size)
    temp.sort()
    y_distribution_samples.append(temp)
# ---------------------------------------------
# # Exponential distribution

# # store the random numbers in a list  
# # nums = []  
# # lambd = 1.5
# for mu in data_ori['y']:  
#     nums = [] 
#     lambd = 1 / mu
#     for i in range(size):  
#         temp = random.expovariate(lambd) 
#         nums.append(temp)  
        
#     # # plotting a graph  
#     # plt.hist(nums, bins = 200)  
#     # plt.show() 

#     nums.sort()
#     y_distribution_samples.append(nums)
# ---------------------------------------------

# print("min is:" + str(min(samples)))
# print("max is:" + str(max(samples)))
# samples.sort()

# print(data_ori['y'])
# print(len(y_distribution_samples[0]))

x = data_ori['x']
# print(range(4))
row = []
rows = []
for j in range(len(y_distribution_samples[0])):
    for i in range(len(data_ori['x'])):
        row.append([x[i],y_distribution_samples[i][j]])
    rows.append(row)
    row = []
# print(rows)
df = pd.DataFrame(rows, columns=["p1", "p2", "p3", "p4"])
df.to_csv('client/src/Data/processed_data_1000_20.csv', index=False)