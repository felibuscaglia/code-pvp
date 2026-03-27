-- Seed challenges and examples for CodeArena
-- 50 challenges: ~17 easy, ~17 medium, ~16 hard

INSERT INTO challenges (id, title, difficulty, description, constraints, starter_code, test_cases, tags) VALUES

-- ===================== EASY =====================

('a0000000-0000-0000-0000-000000000001', 'Two Sum', 'easy',
E'Given an array of integers `nums` and an integer `target`, return the indices of the two numbers such that they add up to `target`.\n\nYou may assume that each input would have **exactly one solution**, and you may not use the same element twice.\n\nYou can return the answer in any order.',
ARRAY['2 <= nums.length <= 10^4', '-10^9 <= nums[i] <= 10^9', '-10^9 <= target <= 10^9', 'Only one valid answer exists.'],
'{"javascript": "function twoSum(nums, target) {\n  // your code here\n}", "python": "def two_sum(nums, target):\n    pass"}',
'{"public": [{"input": {"nums": [2,7,11,15], "target": 9}, "expected": [0,1]}, {"input": {"nums": [3,2,4], "target": 6}, "expected": [1,2]}], "hidden": [{"input": {"nums": [3,3], "target": 6}, "expected": [0,1]}, {"input": {"nums": [1,5,3,7], "target": 8}, "expected": [1,2]}]}',
ARRAY['arrays', 'hash-map']),

('a0000000-0000-0000-0000-000000000002', 'Valid Parentheses', 'easy',
E'Given a string `s` containing just the characters `(`, `)`, `{`, `}`, `[` and `]`, determine if the input string is valid.\n\nAn input string is valid if:\n1. Open brackets must be closed by the same type of brackets.\n2. Open brackets must be closed in the correct order.\n3. Every close bracket has a corresponding open bracket of the same type.',
ARRAY['1 <= s.length <= 10^4', 's consists of parentheses only: ()[]{}'],
'{"javascript": "function isValid(s) {\n  // your code here\n}", "python": "def is_valid(s):\n    pass"}',
'{"public": [{"input": {"s": "()"}, "expected": true}, {"input": {"s": "()[]{}"}, "expected": true}, {"input": {"s": "(]"}, "expected": false}], "hidden": [{"input": {"s": "({[]})"}, "expected": true}, {"input": {"s": "((("}, "expected": false}]}',
ARRAY['strings', 'stack']),

('a0000000-0000-0000-0000-000000000003', 'Reverse String', 'easy',
E'Write a function that reverses a string. The input string is given as an array of characters `s`.\n\nYou must do this by modifying the input array **in-place** with O(1) extra memory.',
ARRAY['1 <= s.length <= 10^5', 's[i] is a printable ASCII character.'],
'{"javascript": "function reverseString(s) {\n  // your code here\n}", "python": "def reverse_string(s):\n    pass"}',
'{"public": [{"input": {"s": ["h","e","l","l","o"]}, "expected": ["o","l","l","e","h"]}, {"input": {"s": ["H","a","n","n","a","h"]}, "expected": ["h","a","n","n","a","H"]}], "hidden": [{"input": {"s": ["a"]}, "expected": ["a"]}, {"input": {"s": ["A","b"]}, "expected": ["b","A"]}]}',
ARRAY['strings', 'two-pointers']),

('a0000000-0000-0000-0000-000000000004', 'Palindrome Number', 'easy',
E'Given an integer `x`, return `true` if `x` is a palindrome, and `false` otherwise.\n\nAn integer is a palindrome when it reads the same forward and backward.',
ARRAY['-2^31 <= x <= 2^31 - 1'],
'{"javascript": "function isPalindrome(x) {\n  // your code here\n}", "python": "def is_palindrome(x):\n    pass"}',
'{"public": [{"input": {"x": 121}, "expected": true}, {"input": {"x": -121}, "expected": false}, {"input": {"x": 10}, "expected": false}], "hidden": [{"input": {"x": 0}, "expected": true}, {"input": {"x": 12321}, "expected": true}]}',
ARRAY['math']),

('a0000000-0000-0000-0000-000000000005', 'FizzBuzz', 'easy',
E'Given an integer `n`, return a string array `answer` (1-indexed) where:\n- `answer[i] == "FizzBuzz"` if `i` is divisible by 3 and 5.\n- `answer[i] == "Fizz"` if `i` is divisible by 3.\n- `answer[i] == "Buzz"` if `i` is divisible by 5.\n- `answer[i] == i` (as a string) if none of the above conditions are true.',
ARRAY['1 <= n <= 10^4'],
'{"javascript": "function fizzBuzz(n) {\n  // your code here\n}", "python": "def fizz_buzz(n):\n    pass"}',
'{"public": [{"input": {"n": 3}, "expected": ["1","2","Fizz"]}, {"input": {"n": 5}, "expected": ["1","2","Fizz","4","Buzz"]}], "hidden": [{"input": {"n": 15}, "expected": ["1","2","Fizz","4","Buzz","Fizz","7","8","Fizz","Buzz","11","Fizz","13","14","FizzBuzz"]}]}',
ARRAY['math', 'strings']),

('a0000000-0000-0000-0000-000000000006', 'Maximum Subarray', 'easy',
E'Given an integer array `nums`, find the subarray with the largest sum, and return its sum.\n\nA subarray is a contiguous non-empty sequence of elements within an array.',
ARRAY['1 <= nums.length <= 10^5', '-10^4 <= nums[i] <= 10^4'],
'{"javascript": "function maxSubArray(nums) {\n  // your code here\n}", "python": "def max_sub_array(nums):\n    pass"}',
'{"public": [{"input": {"nums": [-2,1,-3,4,-1,2,1,-5,4]}, "expected": 6}, {"input": {"nums": [1]}, "expected": 1}], "hidden": [{"input": {"nums": [5,4,-1,7,8]}, "expected": 23}, {"input": {"nums": [-1]}, "expected": -1}]}',
ARRAY['arrays', 'dynamic-programming']),

('a0000000-0000-0000-0000-000000000007', 'Merge Two Sorted Lists', 'easy',
E'You are given the heads of two sorted linked lists `list1` and `list2`.\n\nMerge the two lists into one **sorted** list. The list should be made by splicing together the nodes of the first two lists.\n\nReturn the head of the merged linked list.',
ARRAY['The number of nodes in both lists is in the range [0, 50].', '-100 <= Node.val <= 100', 'Both list1 and list2 are sorted in non-decreasing order.'],
'{"javascript": "function mergeTwoLists(list1, list2) {\n  // your code here\n}", "python": "def merge_two_lists(list1, list2):\n    pass"}',
'{"public": [{"input": {"list1": [1,2,4], "list2": [1,3,4]}, "expected": [1,1,2,3,4,4]}, {"input": {"list1": [], "list2": []}, "expected": []}], "hidden": [{"input": {"list1": [], "list2": [0]}, "expected": [0]}, {"input": {"list1": [1,2,3], "list2": [4,5,6]}, "expected": [1,2,3,4,5,6]}]}',
ARRAY['linked-list', 'recursion']),

('a0000000-0000-0000-0000-000000000008', 'Best Time to Buy and Sell Stock', 'easy',
E'You are given an array `prices` where `prices[i]` is the price of a given stock on the `i`th day.\n\nYou want to maximize your profit by choosing a **single day** to buy one stock and choosing a **different day in the future** to sell that stock.\n\nReturn the maximum profit you can achieve from this transaction. If you cannot achieve any profit, return `0`.',
ARRAY['1 <= prices.length <= 10^5', '0 <= prices[i] <= 10^4'],
'{"javascript": "function maxProfit(prices) {\n  // your code here\n}", "python": "def max_profit(prices):\n    pass"}',
'{"public": [{"input": {"prices": [7,1,5,3,6,4]}, "expected": 5}, {"input": {"prices": [7,6,4,3,1]}, "expected": 0}], "hidden": [{"input": {"prices": [2,4,1]}, "expected": 2}, {"input": {"prices": [1]}, "expected": 0}]}',
ARRAY['arrays', 'dynamic-programming']),

('a0000000-0000-0000-0000-000000000009', 'Roman to Integer', 'easy',
E'Given a roman numeral string `s`, convert it to an integer.\n\nRoman numerals use seven symbols: I=1, V=5, X=10, L=50, C=100, D=500, M=1000.\n\nWhen a smaller value appears before a larger value, it is subtracted (e.g., IV=4, IX=9).',
ARRAY['1 <= s.length <= 15', 's contains only characters: I, V, X, L, C, D, M', 'It is guaranteed that s is a valid roman numeral in the range [1, 3999].'],
'{"javascript": "function romanToInt(s) {\n  // your code here\n}", "python": "def roman_to_int(s):\n    pass"}',
'{"public": [{"input": {"s": "III"}, "expected": 3}, {"input": {"s": "LVIII"}, "expected": 58}, {"input": {"s": "MCMXCIV"}, "expected": 1994}], "hidden": [{"input": {"s": "IV"}, "expected": 4}, {"input": {"s": "IX"}, "expected": 9}]}',
ARRAY['strings', 'math']),

('a0000000-0000-0000-0000-000000000010', 'Contains Duplicate', 'easy',
E'Given an integer array `nums`, return `true` if any value appears **at least twice** in the array, and return `false` if every element is distinct.',
ARRAY['1 <= nums.length <= 10^5', '-10^9 <= nums[i] <= 10^9'],
'{"javascript": "function containsDuplicate(nums) {\n  // your code here\n}", "python": "def contains_duplicate(nums):\n    pass"}',
'{"public": [{"input": {"nums": [1,2,3,1]}, "expected": true}, {"input": {"nums": [1,2,3,4]}, "expected": false}], "hidden": [{"input": {"nums": [1,1,1,3,3,4,3,2,4,2]}, "expected": true}, {"input": {"nums": [0]}, "expected": false}]}',
ARRAY['arrays', 'hash-map', 'sorting']),

('a0000000-0000-0000-0000-000000000011', 'Valid Anagram', 'easy',
E'Given two strings `s` and `t`, return `true` if `t` is an anagram of `s`, and `false` otherwise.\n\nAn anagram is a word formed by rearranging the letters of a different word, using all the original letters exactly once.',
ARRAY['1 <= s.length, t.length <= 5 * 10^4', 's and t consist of lowercase English letters.'],
'{"javascript": "function isAnagram(s, t) {\n  // your code here\n}", "python": "def is_anagram(s, t):\n    pass"}',
'{"public": [{"input": {"s": "anagram", "t": "nagaram"}, "expected": true}, {"input": {"s": "rat", "t": "car"}, "expected": false}], "hidden": [{"input": {"s": "a", "t": "a"}, "expected": true}, {"input": {"s": "ab", "t": "ba"}, "expected": true}]}',
ARRAY['strings', 'hash-map', 'sorting']),

('a0000000-0000-0000-0000-000000000012', 'Climbing Stairs', 'easy',
E'You are climbing a staircase. It takes `n` steps to reach the top.\n\nEach time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?',
ARRAY['1 <= n <= 45'],
'{"javascript": "function climbStairs(n) {\n  // your code here\n}", "python": "def climb_stairs(n):\n    pass"}',
'{"public": [{"input": {"n": 2}, "expected": 2}, {"input": {"n": 3}, "expected": 3}], "hidden": [{"input": {"n": 1}, "expected": 1}, {"input": {"n": 5}, "expected": 8}, {"input": {"n": 10}, "expected": 89}]}',
ARRAY['dynamic-programming', 'math']),

('a0000000-0000-0000-0000-000000000013', 'Single Number', 'easy',
E'Given a non-empty array of integers `nums`, every element appears twice except for one. Find that single one.\n\nYou must implement a solution with linear runtime complexity and use only constant extra space.',
ARRAY['1 <= nums.length <= 3 * 10^4', '-3 * 10^4 <= nums[i] <= 3 * 10^4', 'Each element appears twice except for one element which appears once.'],
'{"javascript": "function singleNumber(nums) {\n  // your code here\n}", "python": "def single_number(nums):\n    pass"}',
'{"public": [{"input": {"nums": [2,2,1]}, "expected": 1}, {"input": {"nums": [4,1,2,1,2]}, "expected": 4}], "hidden": [{"input": {"nums": [1]}, "expected": 1}, {"input": {"nums": [-1,2,-1]}, "expected": 2}]}',
ARRAY['arrays', 'bit-manipulation']),

('a0000000-0000-0000-0000-000000000014', 'Intersection of Two Arrays II', 'easy',
E'Given two integer arrays `nums1` and `nums2`, return an array of their intersection. Each element in the result must appear as many times as it shows in both arrays. You may return the result in any order.',
ARRAY['1 <= nums1.length, nums2.length <= 1000', '0 <= nums1[i], nums2[i] <= 1000'],
'{"javascript": "function intersect(nums1, nums2) {\n  // your code here\n}", "python": "def intersect(nums1, nums2):\n    pass"}',
'{"public": [{"input": {"nums1": [1,2,2,1], "nums2": [2,2]}, "expected": [2,2]}, {"input": {"nums1": [4,9,5], "nums2": [9,4,9,8,4]}, "expected": [4,9]}], "hidden": [{"input": {"nums1": [1,1,1], "nums2": [1]}, "expected": [1]}, {"input": {"nums1": [3,1,2], "nums2": [1,1]}, "expected": [1]}]}',
ARRAY['arrays', 'hash-map', 'sorting']),

('a0000000-0000-0000-0000-000000000015', 'Move Zeroes', 'easy',
E'Given an integer array `nums`, move all `0`s to the end of it while maintaining the relative order of the non-zero elements.\n\nNote that you must do this **in-place** without making a copy of the array.',
ARRAY['1 <= nums.length <= 10^4', '-2^31 <= nums[i] <= 2^31 - 1'],
'{"javascript": "function moveZeroes(nums) {\n  // your code here\n}", "python": "def move_zeroes(nums):\n    pass"}',
'{"public": [{"input": {"nums": [0,1,0,3,12]}, "expected": [1,3,12,0,0]}, {"input": {"nums": [0]}, "expected": [0]}], "hidden": [{"input": {"nums": [1,0,0,2]}, "expected": [1,2,0,0]}, {"input": {"nums": [4,2,1]}, "expected": [4,2,1]}]}',
ARRAY['arrays', 'two-pointers']),

('a0000000-0000-0000-0000-000000000016', 'Missing Number', 'easy',
E'Given an array `nums` containing `n` distinct numbers in the range `[0, n]`, return the only number in the range that is missing from the array.',
ARRAY['n == nums.length', '1 <= n <= 10^4', '0 <= nums[i] <= n', 'All the numbers of nums are unique.'],
'{"javascript": "function missingNumber(nums) {\n  // your code here\n}", "python": "def missing_number(nums):\n    pass"}',
'{"public": [{"input": {"nums": [3,0,1]}, "expected": 2}, {"input": {"nums": [0,1]}, "expected": 2}], "hidden": [{"input": {"nums": [9,6,4,2,3,5,7,0,1]}, "expected": 8}, {"input": {"nums": [0]}, "expected": 1}]}',
ARRAY['arrays', 'math', 'bit-manipulation']),

('a0000000-0000-0000-0000-000000000017', 'Plus One', 'easy',
E'You are given a large integer represented as an integer array `digits`, where each `digits[i]` is the `i`th digit of the integer. The digits are ordered from most significant to least significant in left-to-right order.\n\nIncrement the large integer by one and return the resulting array of digits.',
ARRAY['1 <= digits.length <= 100', '0 <= digits[i] <= 9', 'digits does not contain any leading zeros.'],
'{"javascript": "function plusOne(digits) {\n  // your code here\n}", "python": "def plus_one(digits):\n    pass"}',
'{"public": [{"input": {"digits": [1,2,3]}, "expected": [1,2,4]}, {"input": {"digits": [9]}, "expected": [1,0]}], "hidden": [{"input": {"digits": [9,9,9]}, "expected": [1,0,0,0]}, {"input": {"digits": [4,3,2,1]}, "expected": [4,3,2,2]}]}',
ARRAY['arrays', 'math']),

-- ===================== MEDIUM =====================

('b0000000-0000-0000-0000-000000000001', 'Add Two Numbers', 'medium',
E'You are given two non-empty linked lists representing two non-negative integers. The digits are stored in **reverse order**, and each of their nodes contains a single digit. Add the two numbers and return the sum as a linked list.\n\nYou may assume the two numbers do not contain any leading zero, except the number 0 itself.',
ARRAY['The number of nodes in each linked list is in the range [1, 100].', '0 <= Node.val <= 9', 'It is guaranteed that the list represents a number that does not have leading zeros.'],
'{"javascript": "function addTwoNumbers(l1, l2) {\n  // your code here\n}", "python": "def add_two_numbers(l1, l2):\n    pass"}',
'{"public": [{"input": {"l1": [2,4,3], "l2": [5,6,4]}, "expected": [7,0,8]}, {"input": {"l1": [0], "l2": [0]}, "expected": [0]}], "hidden": [{"input": {"l1": [9,9,9,9,9,9,9], "l2": [9,9,9,9]}, "expected": [8,9,9,9,0,0,0,1]}]}',
ARRAY['linked-list', 'math']),

('b0000000-0000-0000-0000-000000000002', 'Longest Substring Without Repeating Characters', 'medium',
E'Given a string `s`, find the length of the **longest substring** without repeating characters.',
ARRAY['0 <= s.length <= 5 * 10^4', 's consists of English letters, digits, symbols and spaces.'],
'{"javascript": "function lengthOfLongestSubstring(s) {\n  // your code here\n}", "python": "def length_of_longest_substring(s):\n    pass"}',
'{"public": [{"input": {"s": "abcabcbb"}, "expected": 3}, {"input": {"s": "bbbbb"}, "expected": 1}, {"input": {"s": "pwwkew"}, "expected": 3}], "hidden": [{"input": {"s": ""}, "expected": 0}, {"input": {"s": " "}, "expected": 1}, {"input": {"s": "dvdf"}, "expected": 3}]}',
ARRAY['strings', 'sliding-window', 'hash-map']),

('b0000000-0000-0000-0000-000000000003', 'Container With Most Water', 'medium',
E'You are given an integer array `height` of length `n`. There are `n` vertical lines drawn such that the two endpoints of the `i`th line are `(i, 0)` and `(i, height[i])`.\n\nFind two lines that together with the x-axis form a container that holds the most water.\n\nReturn the maximum amount of water a container can store.',
ARRAY['n == height.length', '2 <= n <= 10^5', '0 <= height[i] <= 10^4'],
'{"javascript": "function maxArea(height) {\n  // your code here\n}", "python": "def max_area(height):\n    pass"}',
'{"public": [{"input": {"height": [1,8,6,2,5,4,8,3,7]}, "expected": 49}, {"input": {"height": [1,1]}, "expected": 1}], "hidden": [{"input": {"height": [4,3,2,1,4]}, "expected": 16}, {"input": {"height": [1,2,1]}, "expected": 2}]}',
ARRAY['arrays', 'two-pointers', 'greedy']),

('b0000000-0000-0000-0000-000000000004', 'Three Sum', 'medium',
E'Given an integer array `nums`, return all the triplets `[nums[i], nums[j], nums[k]]` such that `i != j`, `i != k`, and `j != k`, and `nums[i] + nums[j] + nums[k] == 0`.\n\nNotice that the solution set must not contain duplicate triplets.',
ARRAY['3 <= nums.length <= 3000', '-10^5 <= nums[i] <= 10^5'],
'{"javascript": "function threeSum(nums) {\n  // your code here\n}", "python": "def three_sum(nums):\n    pass"}',
'{"public": [{"input": {"nums": [-1,0,1,2,-1,-4]}, "expected": [[-1,-1,2],[-1,0,1]]}, {"input": {"nums": [0,1,1]}, "expected": []}], "hidden": [{"input": {"nums": [0,0,0]}, "expected": [[0,0,0]]}, {"input": {"nums": [-2,0,1,1,2]}, "expected": [[-2,0,2],[-2,1,1]]}]}',
ARRAY['arrays', 'two-pointers', 'sorting']),

('b0000000-0000-0000-0000-000000000005', 'Group Anagrams', 'medium',
E'Given an array of strings `strs`, group the anagrams together. You can return the answer in any order.\n\nAn anagram is a word formed by rearranging the letters of a different word, using all the original letters exactly once.',
ARRAY['1 <= strs.length <= 10^4', '0 <= strs[i].length <= 100', 'strs[i] consists of lowercase English letters.'],
'{"javascript": "function groupAnagrams(strs) {\n  // your code here\n}", "python": "def group_anagrams(strs):\n    pass"}',
'{"public": [{"input": {"strs": ["eat","tea","tan","ate","nat","bat"]}, "expected": [["bat"],["nat","tan"],["ate","eat","tea"]]}, {"input": {"strs": [""]}, "expected": [[""]]}], "hidden": [{"input": {"strs": ["a"]}, "expected": [["a"]]}, {"input": {"strs": ["abc","bca","cab","xyz","zyx"]}, "expected": [["abc","bca","cab"],["xyz","zyx"]]}]}',
ARRAY['strings', 'hash-map', 'sorting']),

('b0000000-0000-0000-0000-000000000006', 'Product of Array Except Self', 'medium',
E'Given an integer array `nums`, return an array `answer` such that `answer[i]` is equal to the product of all the elements of `nums` except `nums[i]`.\n\nYou must write an algorithm that runs in O(n) time and **without using the division operation**.',
ARRAY['2 <= nums.length <= 10^5', '-30 <= nums[i] <= 30', 'The product of any prefix or suffix of nums is guaranteed to fit in a 32-bit integer.'],
'{"javascript": "function productExceptSelf(nums) {\n  // your code here\n}", "python": "def product_except_self(nums):\n    pass"}',
'{"public": [{"input": {"nums": [1,2,3,4]}, "expected": [24,12,8,6]}, {"input": {"nums": [-1,1,0,-3,3]}, "expected": [0,0,9,0,0]}], "hidden": [{"input": {"nums": [2,3]}, "expected": [3,2]}, {"input": {"nums": [1,1,1,1]}, "expected": [1,1,1,1]}]}',
ARRAY['arrays', 'prefix-sum']),

('b0000000-0000-0000-0000-000000000007', 'Top K Frequent Elements', 'medium',
E'Given an integer array `nums` and an integer `k`, return the `k` most frequent elements. You may return the answer in any order.',
ARRAY['1 <= nums.length <= 10^5', '-10^4 <= nums[i] <= 10^4', 'k is in the range [1, the number of unique elements in the array].', 'It is guaranteed that the answer is unique.'],
'{"javascript": "function topKFrequent(nums, k) {\n  // your code here\n}", "python": "def top_k_frequent(nums, k):\n    pass"}',
'{"public": [{"input": {"nums": [1,1,1,2,2,3], "k": 2}, "expected": [1,2]}, {"input": {"nums": [1], "k": 1}, "expected": [1]}], "hidden": [{"input": {"nums": [4,4,4,3,3,2,1], "k": 3}, "expected": [4,3,2]}, {"input": {"nums": [1,2], "k": 2}, "expected": [1,2]}]}',
ARRAY['arrays', 'hash-map', 'sorting', 'heap']),

('b0000000-0000-0000-0000-000000000008', 'Binary Tree Level Order Traversal', 'medium',
E'Given the `root` of a binary tree, return the level order traversal of its nodes'' values (i.e., from left to right, level by level).',
ARRAY['The number of nodes in the tree is in the range [0, 2000].', '-1000 <= Node.val <= 1000'],
'{"javascript": "function levelOrder(root) {\n  // your code here\n}", "python": "def level_order(root):\n    pass"}',
'{"public": [{"input": {"root": [3,9,20,null,null,15,7]}, "expected": [[3],[9,20],[15,7]]}, {"input": {"root": [1]}, "expected": [[1]]}], "hidden": [{"input": {"root": []}, "expected": []}, {"input": {"root": [1,2,3,4,5]}, "expected": [[1],[2,3],[4,5]]}]}',
ARRAY['trees', 'bfs', 'queue']),

('b0000000-0000-0000-0000-000000000009', 'Validate Binary Search Tree', 'medium',
E'Given the `root` of a binary tree, determine if it is a valid binary search tree (BST).\n\nA valid BST is defined as follows:\n- The left subtree of a node contains only nodes with keys **less than** the node''s key.\n- The right subtree of a node contains only nodes with keys **greater than** the node''s key.\n- Both the left and right subtrees must also be binary search trees.',
ARRAY['The number of nodes in the tree is in the range [1, 10^4].', '-2^31 <= Node.val <= 2^31 - 1'],
'{"javascript": "function isValidBST(root) {\n  // your code here\n}", "python": "def is_valid_bst(root):\n    pass"}',
'{"public": [{"input": {"root": [2,1,3]}, "expected": true}, {"input": {"root": [5,1,4,null,null,3,6]}, "expected": false}], "hidden": [{"input": {"root": [1]}, "expected": true}, {"input": {"root": [5,4,6,null,null,3,7]}, "expected": false}]}',
ARRAY['trees', 'dfs', 'bst']),

('b0000000-0000-0000-0000-000000000010', 'Number of Islands', 'medium',
E'Given an `m x n` 2D binary grid `grid` which represents a map of `1`s (land) and `0`s (water), return the number of islands.\n\nAn island is surrounded by water and is formed by connecting adjacent lands horizontally or vertically.',
ARRAY['m == grid.length', 'n == grid[i].length', '1 <= m, n <= 300', 'grid[i][j] is 0 or 1.'],
'{"javascript": "function numIslands(grid) {\n  // your code here\n}", "python": "def num_islands(grid):\n    pass"}',
'{"public": [{"input": {"grid": [["1","1","1","1","0"],["1","1","0","1","0"],["1","1","0","0","0"],["0","0","0","0","0"]]}, "expected": 1}, {"input": {"grid": [["1","1","0","0","0"],["1","1","0","0","0"],["0","0","1","0","0"],["0","0","0","1","1"]]}, "expected": 3}], "hidden": [{"input": {"grid": [["1"]]}, "expected": 1}, {"input": {"grid": [["0","0"],["0","0"]]}, "expected": 0}]}',
ARRAY['graphs', 'dfs', 'bfs', 'matrix']),

('b0000000-0000-0000-0000-000000000011', 'Course Schedule', 'medium',
E'There are a total of `numCourses` courses you have to take, labeled from `0` to `numCourses - 1`. You are given an array `prerequisites` where `prerequisites[i] = [ai, bi]` indicates that you must take course `bi` first if you want to take course `ai`.\n\nReturn `true` if you can finish all courses. Otherwise, return `false`.',
ARRAY['1 <= numCourses <= 2000', '0 <= prerequisites.length <= 5000', 'prerequisites[i].length == 2', '0 <= ai, bi < numCourses', 'All the pairs prerequisites[i] are unique.'],
'{"javascript": "function canFinish(numCourses, prerequisites) {\n  // your code here\n}", "python": "def can_finish(num_courses, prerequisites):\n    pass"}',
'{"public": [{"input": {"numCourses": 2, "prerequisites": [[1,0]]}, "expected": true}, {"input": {"numCourses": 2, "prerequisites": [[1,0],[0,1]]}, "expected": false}], "hidden": [{"input": {"numCourses": 3, "prerequisites": [[1,0],[2,1]]}, "expected": true}, {"input": {"numCourses": 1, "prerequisites": []}, "expected": true}]}',
ARRAY['graphs', 'topological-sort', 'dfs']),

('b0000000-0000-0000-0000-000000000012', 'Coin Change', 'medium',
E'You are given an integer array `coins` representing coins of different denominations and an integer `amount` representing a total amount of money.\n\nReturn the fewest number of coins that you need to make up that amount. If that amount of money cannot be made up by any combination of the coins, return `-1`.\n\nYou may assume that you have an infinite number of each kind of coin.',
ARRAY['1 <= coins.length <= 12', '1 <= coins[i] <= 2^31 - 1', '0 <= amount <= 10^4'],
'{"javascript": "function coinChange(coins, amount) {\n  // your code here\n}", "python": "def coin_change(coins, amount):\n    pass"}',
'{"public": [{"input": {"coins": [1,5,10,25], "amount": 30}, "expected": 2}, {"input": {"coins": [2], "amount": 3}, "expected": -1}], "hidden": [{"input": {"coins": [1], "amount": 0}, "expected": 0}, {"input": {"coins": [1,2,5], "amount": 11}, "expected": 3}]}',
ARRAY['dynamic-programming', 'bfs']),

('b0000000-0000-0000-0000-000000000013', 'Rotate Image', 'medium',
E'You are given an `n x n` 2D `matrix` representing an image, rotate the image by **90 degrees** (clockwise).\n\nYou have to rotate the image **in-place**, which means you have to modify the input 2D matrix directly. DO NOT allocate another 2D matrix and do the rotation.',
ARRAY['n == matrix.length == matrix[i].length', '1 <= n <= 20', '-1000 <= matrix[i][j] <= 1000'],
'{"javascript": "function rotate(matrix) {\n  // your code here\n}", "python": "def rotate(matrix):\n    pass"}',
'{"public": [{"input": {"matrix": [[1,2,3],[4,5,6],[7,8,9]]}, "expected": [[7,4,1],[8,5,2],[9,6,3]]}, {"input": {"matrix": [[5,1,9,11],[2,4,8,10],[13,3,6,7],[15,14,12,16]]}, "expected": [[15,13,2,5],[14,3,4,1],[12,6,8,9],[16,7,10,11]]}], "hidden": [{"input": {"matrix": [[1]]}, "expected": [[1]]}, {"input": {"matrix": [[1,2],[3,4]]}, "expected": [[3,1],[4,2]]}]}',
ARRAY['arrays', 'matrix', 'math']),

('b0000000-0000-0000-0000-000000000014', 'Search in Rotated Sorted Array', 'medium',
E'Given the array `nums` after a possible rotation and an integer `target`, return the index of `target` if it is in `nums`, or `-1` if it is not in `nums`.\n\nYou must write an algorithm with O(log n) runtime complexity.',
ARRAY['1 <= nums.length <= 5000', '-10^4 <= nums[i] <= 10^4', 'All values of nums are unique.', 'nums is an ascending array that is possibly rotated.', '-10^4 <= target <= 10^4'],
'{"javascript": "function search(nums, target) {\n  // your code here\n}", "python": "def search(nums, target):\n    pass"}',
'{"public": [{"input": {"nums": [4,5,6,7,0,1,2], "target": 0}, "expected": 4}, {"input": {"nums": [4,5,6,7,0,1,2], "target": 3}, "expected": -1}], "hidden": [{"input": {"nums": [1], "target": 0}, "expected": -1}, {"input": {"nums": [3,1], "target": 1}, "expected": 1}]}',
ARRAY['arrays', 'binary-search']),

('b0000000-0000-0000-0000-000000000015', 'Word Break', 'medium',
E'Given a string `s` and a dictionary of strings `wordDict`, return `true` if `s` can be segmented into a space-separated sequence of one or more dictionary words.\n\nNote that the same word in the dictionary may be reused multiple times in the segmentation.',
ARRAY['1 <= s.length <= 300', '1 <= wordDict.length <= 1000', '1 <= wordDict[i].length <= 20', 's and wordDict[i] consist of only lowercase English letters.', 'All the strings of wordDict are unique.'],
'{"javascript": "function wordBreak(s, wordDict) {\n  // your code here\n}", "python": "def word_break(s, word_dict):\n    pass"}',
'{"public": [{"input": {"s": "leetcode", "wordDict": ["leet","code"]}, "expected": true}, {"input": {"s": "catsandog", "wordDict": ["cats","dog","sand","and","cat"]}, "expected": false}], "hidden": [{"input": {"s": "applepenapple", "wordDict": ["apple","pen"]}, "expected": true}, {"input": {"s": "a", "wordDict": ["a"]}, "expected": true}]}',
ARRAY['strings', 'dynamic-programming', 'hash-map']),

('b0000000-0000-0000-0000-000000000016', 'Longest Palindromic Substring', 'medium',
E'Given a string `s`, return the longest palindromic substring in `s`.',
ARRAY['1 <= s.length <= 1000', 's consists of only digits and English letters.'],
'{"javascript": "function longestPalindrome(s) {\n  // your code here\n}", "python": "def longest_palindrome(s):\n    pass"}',
'{"public": [{"input": {"s": "babad"}, "expected": "bab"}, {"input": {"s": "cbbd"}, "expected": "bb"}], "hidden": [{"input": {"s": "a"}, "expected": "a"}, {"input": {"s": "racecar"}, "expected": "racecar"}]}',
ARRAY['strings', 'dynamic-programming']),

('b0000000-0000-0000-0000-000000000017', 'Letter Combinations of a Phone Number', 'medium',
E'Given a string containing digits from `2-9` inclusive, return all possible letter combinations that the number could represent. Return the answer in any order.\n\nMapping: 2=abc, 3=def, 4=ghi, 5=jkl, 6=mno, 7=pqrs, 8=tuv, 9=wxyz.',
ARRAY['0 <= digits.length <= 4', 'digits[i] is a digit in the range [2, 9].'],
'{"javascript": "function letterCombinations(digits) {\n  // your code here\n}", "python": "def letter_combinations(digits):\n    pass"}',
'{"public": [{"input": {"digits": "23"}, "expected": ["ad","ae","af","bd","be","bf","cd","ce","cf"]}, {"input": {"digits": ""}, "expected": []}], "hidden": [{"input": {"digits": "2"}, "expected": ["a","b","c"]}, {"input": {"digits": "79"}, "expected": ["pw","px","py","pz","qw","qx","qy","qz","rw","rx","ry","rz","sw","sx","sy","sz"]}]}',
ARRAY['strings', 'backtracking', 'recursion']),

-- ===================== HARD =====================

('c0000000-0000-0000-0000-000000000001', 'Median of Two Sorted Arrays', 'hard',
E'Given two sorted arrays `nums1` and `nums2` of size `m` and `n` respectively, return the median of the two sorted arrays.\n\nThe overall run time complexity should be O(log (m+n)).',
ARRAY['nums1.length == m', 'nums2.length == n', '0 <= m <= 1000', '0 <= n <= 1000', '1 <= m + n <= 2000', '-10^6 <= nums1[i], nums2[i] <= 10^6'],
'{"javascript": "function findMedianSortedArrays(nums1, nums2) {\n  // your code here\n}", "python": "def find_median_sorted_arrays(nums1, nums2):\n    pass"}',
'{"public": [{"input": {"nums1": [1,3], "nums2": [2]}, "expected": 2.0}, {"input": {"nums1": [1,2], "nums2": [3,4]}, "expected": 2.5}], "hidden": [{"input": {"nums1": [], "nums2": [1]}, "expected": 1.0}, {"input": {"nums1": [0,0], "nums2": [0,0]}, "expected": 0.0}]}',
ARRAY['arrays', 'binary-search', 'divide-and-conquer']),

('c0000000-0000-0000-0000-000000000002', 'Regular Expression Matching', 'hard',
E'Given an input string `s` and a pattern `p`, implement regular expression matching with support for `.` and `*` where:\n- `.` matches any single character.\n- `*` matches zero or more of the preceding element.\n\nThe matching should cover the **entire** input string (not partial).',
ARRAY['1 <= s.length <= 20', '1 <= p.length <= 20', 's contains only lowercase English letters.', 'p contains only lowercase English letters, . and *.', 'It is guaranteed for each appearance of *, there will be a previous valid character to match.'],
'{"javascript": "function isMatch(s, p) {\n  // your code here\n}", "python": "def is_match(s, p):\n    pass"}',
'{"public": [{"input": {"s": "aa", "p": "a"}, "expected": false}, {"input": {"s": "aa", "p": "a*"}, "expected": true}, {"input": {"s": "ab", "p": ".*"}, "expected": true}], "hidden": [{"input": {"s": "aab", "p": "c*a*b"}, "expected": true}, {"input": {"s": "mississippi", "p": "mis*is*ip*."}, "expected": true}]}',
ARRAY['strings', 'dynamic-programming', 'recursion']),

('c0000000-0000-0000-0000-000000000003', 'Merge K Sorted Lists', 'hard',
E'You are given an array of `k` linked-lists `lists`, each linked-list is sorted in ascending order.\n\nMerge all the linked-lists into one sorted linked-list and return it.',
ARRAY['k == lists.length', '0 <= k <= 10^4', '0 <= lists[i].length <= 500', '-10^4 <= lists[i][j] <= 10^4', 'lists[i] is sorted in ascending order.', 'The sum of lists[i].length will not exceed 10^4.'],
'{"javascript": "function mergeKLists(lists) {\n  // your code here\n}", "python": "def merge_k_lists(lists):\n    pass"}',
'{"public": [{"input": {"lists": [[1,4,5],[1,3,4],[2,6]]}, "expected": [1,1,2,3,4,4,5,6]}, {"input": {"lists": []}, "expected": []}], "hidden": [{"input": {"lists": [[]]}, "expected": []}, {"input": {"lists": [[1],[2],[3]]}, "expected": [1,2,3]}]}',
ARRAY['linked-list', 'heap', 'divide-and-conquer']),

('c0000000-0000-0000-0000-000000000004', 'Trapping Rain Water', 'hard',
E'Given `n` non-negative integers representing an elevation map where the width of each bar is 1, compute how much water it can trap after raining.',
ARRAY['n == height.length', '1 <= n <= 2 * 10^4', '0 <= height[i] <= 10^5'],
'{"javascript": "function trap(height) {\n  // your code here\n}", "python": "def trap(height):\n    pass"}',
'{"public": [{"input": {"height": [0,1,0,2,1,0,1,3,2,1,2,1]}, "expected": 6}, {"input": {"height": [4,2,0,3,2,5]}, "expected": 9}], "hidden": [{"input": {"height": [0]}, "expected": 0}, {"input": {"height": [3,0,3]}, "expected": 3}]}',
ARRAY['arrays', 'two-pointers', 'dynamic-programming', 'stack']),

('c0000000-0000-0000-0000-000000000005', 'N-Queens', 'hard',
E'The n-queens puzzle is the problem of placing `n` queens on an `n x n` chessboard such that no two queens attack each other.\n\nGiven an integer `n`, return all distinct solutions to the n-queens puzzle. Each solution contains a distinct board configuration of the placement, where `Q` and `.` both indicate a queen and an empty space, respectively.',
ARRAY['1 <= n <= 9'],
'{"javascript": "function solveNQueens(n) {\n  // your code here\n}", "python": "def solve_n_queens(n):\n    pass"}',
'{"public": [{"input": {"n": 4}, "expected": [[".Q..","...Q","Q...","..Q."],["..Q.","Q...","...Q",".Q.."]]}, {"input": {"n": 1}, "expected": [["Q"]]}], "hidden": [{"input": {"n": 2}, "expected": []}, {"input": {"n": 3}, "expected": []}]}',
ARRAY['backtracking', 'recursion', 'matrix']),

('c0000000-0000-0000-0000-000000000006', 'Word Ladder', 'hard',
E'Given two words `beginWord` and `endWord`, and a dictionary `wordList`, return the number of words in the **shortest transformation sequence** from `beginWord` to `endWord`, or `0` if no such sequence exists.\n\nEvery adjacent pair of words differs by a single letter. Every transformed word must exist in the word list.',
ARRAY['1 <= beginWord.length <= 10', 'endWord.length == beginWord.length', '1 <= wordList.length <= 5000', 'wordList[i].length == beginWord.length', 'beginWord, endWord, and wordList[i] consist of lowercase English letters.', 'beginWord != endWord', 'All the words in wordList are unique.'],
'{"javascript": "function ladderLength(beginWord, endWord, wordList) {\n  // your code here\n}", "python": "def ladder_length(begin_word, end_word, word_list):\n    pass"}',
'{"public": [{"input": {"beginWord": "hit", "endWord": "cog", "wordList": ["hot","dot","dog","lot","log","cog"]}, "expected": 5}, {"input": {"beginWord": "hit", "endWord": "cog", "wordList": ["hot","dot","dog","lot","log"]}, "expected": 0}], "hidden": [{"input": {"beginWord": "a", "endWord": "c", "wordList": ["a","b","c"]}, "expected": 2}]}',
ARRAY['graphs', 'bfs', 'strings']),

('c0000000-0000-0000-0000-000000000007', 'Minimum Window Substring', 'hard',
E'Given two strings `s` and `t` of lengths `m` and `n` respectively, return the **minimum window substring** of `s` such that every character in `t` (including duplicates) is included in the window. If there is no such substring, return the empty string `""`.\n\nThe answer is guaranteed to be unique.',
ARRAY['m == s.length', 'n == t.length', '1 <= m, n <= 10^5', 's and t consist of uppercase and lowercase English letters.'],
'{"javascript": "function minWindow(s, t) {\n  // your code here\n}", "python": "def min_window(s, t):\n    pass"}',
'{"public": [{"input": {"s": "ADOBECODEBANC", "t": "ABC"}, "expected": "BANC"}, {"input": {"s": "a", "t": "a"}, "expected": "a"}], "hidden": [{"input": {"s": "a", "t": "aa"}, "expected": ""}, {"input": {"s": "ab", "t": "b"}, "expected": "b"}]}',
ARRAY['strings', 'sliding-window', 'hash-map']),

('c0000000-0000-0000-0000-000000000008', 'Serialize and Deserialize Binary Tree', 'hard',
E'Design an algorithm to serialize and deserialize a binary tree. Serialization is the process of converting a data structure into a sequence of bits so that it can be stored or transmitted and reconstructed later.\n\nThere is no restriction on how your serialization/deserialization algorithm should work. You just need to ensure that a binary tree can be serialized to a string and this string can be deserialized to the original tree structure.',
ARRAY['The number of nodes in the tree is in the range [0, 10^4].', '-1000 <= Node.val <= 1000'],
'{"javascript": "function serialize(root) {\n  // your code here\n}\n\nfunction deserialize(data) {\n  // your code here\n}", "python": "def serialize(root):\n    pass\n\ndef deserialize(data):\n    pass"}',
'{"public": [{"input": {"root": [1,2,3,null,null,4,5]}, "expected": [1,2,3,null,null,4,5]}, {"input": {"root": []}, "expected": []}], "hidden": [{"input": {"root": [1]}, "expected": [1]}, {"input": {"root": [1,2]}, "expected": [1,2]}]}',
ARRAY['trees', 'dfs', 'bfs', 'design']),

('c0000000-0000-0000-0000-000000000009', 'Longest Increasing Path in a Matrix', 'hard',
E'Given an `m x n` integers `matrix`, return the length of the longest increasing path in `matrix`.\n\nFrom each cell, you can either move in four directions: left, right, up, or down. You may **not** move diagonally or move outside the boundary.',
ARRAY['m == matrix.length', 'n == matrix[i].length', '1 <= m, n <= 200', '0 <= matrix[i][j] <= 2^31 - 1'],
'{"javascript": "function longestIncreasingPath(matrix) {\n  // your code here\n}", "python": "def longest_increasing_path(matrix):\n    pass"}',
'{"public": [{"input": {"matrix": [[9,9,4],[6,6,8],[2,1,1]]}, "expected": 4}, {"input": {"matrix": [[3,4,5],[3,2,6],[2,2,1]]}, "expected": 4}], "hidden": [{"input": {"matrix": [[1]]}, "expected": 1}, {"input": {"matrix": [[1,2],[4,3]]}, "expected": 4}]}',
ARRAY['matrix', 'dfs', 'dynamic-programming', 'memoization']),

('c0000000-0000-0000-0000-000000000010', 'LRU Cache', 'hard',
E'Design a data structure that follows the constraints of a **Least Recently Used (LRU) cache**.\n\nImplement the `LRUCache` class:\n- `LRUCache(int capacity)` Initialize the LRU cache with positive size `capacity`.\n- `int get(int key)` Return the value of the key if it exists, otherwise return `-1`.\n- `void put(int key, int value)` Update the value of the key if it exists. Otherwise, add the key-value pair. If the number of keys exceeds `capacity`, evict the least recently used key.',
ARRAY['1 <= capacity <= 3000', '0 <= key <= 10^4', '0 <= value <= 10^5', 'At most 2 * 10^5 calls will be made to get and put.'],
'{"javascript": "class LRUCache {\n  constructor(capacity) {\n    // your code here\n  }\n  get(key) {\n    // your code here\n  }\n  put(key, value) {\n    // your code here\n  }\n}", "python": "class LRUCache:\n    def __init__(self, capacity):\n        pass\n    def get(self, key):\n        pass\n    def put(self, key, value):\n        pass"}',
'{"public": [{"input": {"operations": ["LRUCache","put","put","get","put","get","put","get","get","get"], "args": [[2],[1,1],[2,2],[1],[3,3],[2],[4,4],[1],[3],[4]]}, "expected": [null,null,null,1,null,-1,null,-1,3,4]}], "hidden": [{"input": {"operations": ["LRUCache","put","get","put","get","get"], "args": [[1],[2,1],[2],[3,2],[2],[3]]}, "expected": [null,null,1,null,-1,2]}]}',
ARRAY['design', 'hash-map', 'linked-list']),

('c0000000-0000-0000-0000-000000000011', 'Alien Dictionary', 'hard',
E'There is a new alien language that uses the English alphabet. However, the order of the letters is unknown to you.\n\nYou are given a list of strings `words` from the alien language''s dictionary, where the strings are **sorted lexicographically** by the rules of this new language.\n\nDerive the order of letters in this language and return it as a string. If there are multiple valid orderings, return any of them. If no valid ordering exists, return `""`.',
ARRAY['1 <= words.length <= 100', '1 <= words[i].length <= 100', 'words[i] consists of only lowercase English letters.'],
'{"javascript": "function alienOrder(words) {\n  // your code here\n}", "python": "def alien_order(words):\n    pass"}',
'{"public": [{"input": {"words": ["wrt","wrf","er","ett","rftt"]}, "expected": "wertf"}, {"input": {"words": ["z","x"]}, "expected": "zx"}], "hidden": [{"input": {"words": ["z","x","z"]}, "expected": ""}, {"input": {"words": ["abc","ab"]}, "expected": ""}]}',
ARRAY['graphs', 'topological-sort']),

('c0000000-0000-0000-0000-000000000012', 'Edit Distance', 'hard',
E'Given two strings `word1` and `word2`, return the minimum number of operations required to convert `word1` to `word2`.\n\nYou have the following three operations permitted on a word:\n- Insert a character\n- Delete a character\n- Replace a character',
ARRAY['0 <= word1.length, word2.length <= 500', 'word1 and word2 consist of lowercase English letters.'],
'{"javascript": "function minDistance(word1, word2) {\n  // your code here\n}", "python": "def min_distance(word1, word2):\n    pass"}',
'{"public": [{"input": {"word1": "horse", "word2": "ros"}, "expected": 3}, {"input": {"word1": "intention", "word2": "execution"}, "expected": 5}], "hidden": [{"input": {"word1": "", "word2": "abc"}, "expected": 3}, {"input": {"word1": "abc", "word2": "abc"}, "expected": 0}]}',
ARRAY['strings', 'dynamic-programming']),

('c0000000-0000-0000-0000-000000000013', 'Find Median from Data Stream', 'hard',
E'The **MedianFinder** class should support the following operations:\n- `addNum(int num)` — adds the integer `num` to the data structure.\n- `findMedian()` — returns the median of all elements so far.\n\nIf the count of numbers is even, the median is the average of the two middle values.',
ARRAY['-10^5 <= num <= 10^5', 'There will be at least one element before calling findMedian.', 'At most 5 * 10^4 calls will be made to addNum and findMedian.'],
'{"javascript": "class MedianFinder {\n  constructor() {\n    // your code here\n  }\n  addNum(num) {\n    // your code here\n  }\n  findMedian() {\n    // your code here\n  }\n}", "python": "class MedianFinder:\n    def __init__(self):\n        pass\n    def add_num(self, num):\n        pass\n    def find_median(self):\n        pass"}',
'{"public": [{"input": {"operations": ["MedianFinder","addNum","addNum","findMedian","addNum","findMedian"], "args": [[],[1],[2],[],[3],[]]}, "expected": [null,null,null,1.5,null,2.0]}], "hidden": [{"input": {"operations": ["MedianFinder","addNum","findMedian","addNum","findMedian"], "args": [[],[5],[],[10],[]]}, "expected": [null,null,5.0,null,7.5]}]}',
ARRAY['design', 'heap', 'sorting']),

('c0000000-0000-0000-0000-000000000014', 'Burst Balloons', 'hard',
E'You are given `n` balloons, indexed from `0` to `n - 1`. Each balloon is painted with a number on it represented by an array `nums`. You are asked to burst all the balloons.\n\nIf you burst the `i`th balloon, you will get `nums[i - 1] * nums[i] * nums[i + 1]` coins. If `i - 1` or `i + 1` goes out of bounds of the array, then treat it as if there is a balloon with a `1` painted on it.\n\nReturn the maximum coins you can collect by bursting the balloons wisely.',
ARRAY['n == nums.length', '1 <= n <= 300', '0 <= nums[i] <= 100'],
'{"javascript": "function maxCoins(nums) {\n  // your code here\n}", "python": "def max_coins(nums):\n    pass"}',
'{"public": [{"input": {"nums": [3,1,5,8]}, "expected": 167}, {"input": {"nums": [1,5]}, "expected": 10}], "hidden": [{"input": {"nums": [1]}, "expected": 1}, {"input": {"nums": [7,9,8,0,7,1,3,5,5,2]}, "expected": 1654}]}',
ARRAY['dynamic-programming', 'divide-and-conquer']),

('c0000000-0000-0000-0000-000000000015', 'Longest Valid Parentheses', 'hard',
E'Given a string containing just the characters `(` and `)`, return the length of the longest valid (well-formed) parentheses substring.',
ARRAY['0 <= s.length <= 3 * 10^4', 's[i] is ( or ).'],
'{"javascript": "function longestValidParentheses(s) {\n  // your code here\n}", "python": "def longest_valid_parentheses(s):\n    pass"}',
'{"public": [{"input": {"s": "(()"}, "expected": 2}, {"input": {"s": ")()())"}, "expected": 4}], "hidden": [{"input": {"s": ""}, "expected": 0}, {"input": {"s": "()(()"}, "expected": 2}, {"input": {"s": "()(())"}, "expected": 6}]}',
ARRAY['strings', 'dynamic-programming', 'stack']),

('c0000000-0000-0000-0000-000000000016', 'Sliding Window Maximum', 'hard',
E'You are given an array of integers `nums` and an integer `k` representing the size of a sliding window which moves from the very left of the array to the very right. You can only see the `k` numbers in the window. Each time the sliding window moves right by one position.\n\nReturn the max sliding window.',
ARRAY['1 <= nums.length <= 10^5', '-10^4 <= nums[i] <= 10^4', '1 <= k <= nums.length'],
'{"javascript": "function maxSlidingWindow(nums, k) {\n  // your code here\n}", "python": "def max_sliding_window(nums, k):\n    pass"}',
'{"public": [{"input": {"nums": [1,3,-1,-3,5,3,6,7], "k": 3}, "expected": [3,3,5,5,6,7]}, {"input": {"nums": [1], "k": 1}, "expected": [1]}], "hidden": [{"input": {"nums": [1,-1], "k": 1}, "expected": [1,-1]}, {"input": {"nums": [9,11], "k": 2}, "expected": [11]}]}',
ARRAY['arrays', 'sliding-window', 'deque', 'monotonic-queue']);


-- ===================== EXAMPLES =====================

INSERT INTO examples (challenge_id, input, output, explanation) VALUES

-- Two Sum
('a0000000-0000-0000-0000-000000000001', 'nums = [2,7,11,15], target = 9', '[0,1]', 'Because nums[0] + nums[1] == 9, we return [0, 1].'),
('a0000000-0000-0000-0000-000000000001', 'nums = [3,2,4], target = 6', '[1,2]', 'Because nums[1] + nums[2] == 6, we return [1, 2].'),
('a0000000-0000-0000-0000-000000000001', 'nums = [3,3], target = 6', '[0,1]', 'Because nums[0] + nums[1] == 6, we return [0, 1].'),

-- Valid Parentheses
('a0000000-0000-0000-0000-000000000002', 's = "()"', 'true', NULL),
('a0000000-0000-0000-0000-000000000002', 's = "()[]{}"', 'true', NULL),
('a0000000-0000-0000-0000-000000000002', 's = "(]"', 'false', NULL),

-- Reverse String
('a0000000-0000-0000-0000-000000000003', 's = ["h","e","l","l","o"]', '["o","l","l","e","h"]', NULL),
('a0000000-0000-0000-0000-000000000003', 's = ["H","a","n","n","a","h"]', '["h","a","n","n","a","H"]', NULL),

-- Palindrome Number
('a0000000-0000-0000-0000-000000000004', 'x = 121', 'true', 'Reads as 121 from left to right and from right to left.'),
('a0000000-0000-0000-0000-000000000004', 'x = -121', 'false', 'From left to right, it reads -121. From right to left it becomes 121-. Therefore it is not a palindrome.'),
('a0000000-0000-0000-0000-000000000004', 'x = 10', 'false', 'Reads 01 from right to left. Therefore it is not a palindrome.'),

-- FizzBuzz
('a0000000-0000-0000-0000-000000000005', 'n = 3', '["1","2","Fizz"]', NULL),
('a0000000-0000-0000-0000-000000000005', 'n = 5', '["1","2","Fizz","4","Buzz"]', NULL),

-- Maximum Subarray
('a0000000-0000-0000-0000-000000000006', 'nums = [-2,1,-3,4,-1,2,1,-5,4]', '6', 'The subarray [4,-1,2,1] has the largest sum 6.'),
('a0000000-0000-0000-0000-000000000006', 'nums = [1]', '1', NULL),

-- Merge Two Sorted Lists
('a0000000-0000-0000-0000-000000000007', 'list1 = [1,2,4], list2 = [1,3,4]', '[1,1,2,3,4,4]', NULL),
('a0000000-0000-0000-0000-000000000007', 'list1 = [], list2 = []', '[]', NULL),

-- Best Time to Buy and Sell Stock
('a0000000-0000-0000-0000-000000000008', 'prices = [7,1,5,3,6,4]', '5', 'Buy on day 2 (price = 1) and sell on day 5 (price = 6), profit = 6-1 = 5.'),
('a0000000-0000-0000-0000-000000000008', 'prices = [7,6,4,3,1]', '0', 'No transactions are done and the max profit = 0.'),

-- Roman to Integer
('a0000000-0000-0000-0000-000000000009', 's = "III"', '3', 'III = 1 + 1 + 1 = 3.'),
('a0000000-0000-0000-0000-000000000009', 's = "LVIII"', '58', 'L = 50, V = 5, III = 3.'),
('a0000000-0000-0000-0000-000000000009', 's = "MCMXCIV"', '1994', 'M = 1000, CM = 900, XC = 90 and IV = 4.'),

-- Contains Duplicate
('a0000000-0000-0000-0000-000000000010', 'nums = [1,2,3,1]', 'true', NULL),
('a0000000-0000-0000-0000-000000000010', 'nums = [1,2,3,4]', 'false', NULL),

-- Valid Anagram
('a0000000-0000-0000-0000-000000000011', 's = "anagram", t = "nagaram"', 'true', NULL),
('a0000000-0000-0000-0000-000000000011', 's = "rat", t = "car"', 'false', NULL),

-- Climbing Stairs
('a0000000-0000-0000-0000-000000000012', 'n = 2', '2', 'Two ways: 1+1 or 2.'),
('a0000000-0000-0000-0000-000000000012', 'n = 3', '3', 'Three ways: 1+1+1, 1+2, or 2+1.'),

-- Single Number
('a0000000-0000-0000-0000-000000000013', 'nums = [2,2,1]', '1', NULL),
('a0000000-0000-0000-0000-000000000013', 'nums = [4,1,2,1,2]', '4', NULL),

-- Intersection of Two Arrays II
('a0000000-0000-0000-0000-000000000014', 'nums1 = [1,2,2,1], nums2 = [2,2]', '[2,2]', NULL),
('a0000000-0000-0000-0000-000000000014', 'nums1 = [4,9,5], nums2 = [9,4,9,8,4]', '[4,9]', NULL),

-- Move Zeroes
('a0000000-0000-0000-0000-000000000015', 'nums = [0,1,0,3,12]', '[1,3,12,0,0]', NULL),
('a0000000-0000-0000-0000-000000000015', 'nums = [0]', '[0]', NULL),

-- Missing Number
('a0000000-0000-0000-0000-000000000016', 'nums = [3,0,1]', '2', NULL),
('a0000000-0000-0000-0000-000000000016', 'nums = [0,1]', '2', NULL),

-- Plus One
('a0000000-0000-0000-0000-000000000017', 'digits = [1,2,3]', '[1,2,4]', NULL),
('a0000000-0000-0000-0000-000000000017', 'digits = [9]', '[1,0]', NULL),

-- Add Two Numbers
('b0000000-0000-0000-0000-000000000001', 'l1 = [2,4,3], l2 = [5,6,4]', '[7,0,8]', '342 + 465 = 807.'),
('b0000000-0000-0000-0000-000000000001', 'l1 = [0], l2 = [0]', '[0]', NULL),

-- Longest Substring Without Repeating Characters
('b0000000-0000-0000-0000-000000000002', 's = "abcabcbb"', '3', 'The answer is "abc", with the length of 3.'),
('b0000000-0000-0000-0000-000000000002', 's = "bbbbb"', '1', 'The answer is "b", with the length of 1.'),
('b0000000-0000-0000-0000-000000000002', 's = "pwwkew"', '3', 'The answer is "wke", with the length of 3.'),

-- Container With Most Water
('b0000000-0000-0000-0000-000000000003', 'height = [1,8,6,2,5,4,8,3,7]', '49', NULL),
('b0000000-0000-0000-0000-000000000003', 'height = [1,1]', '1', NULL),

-- Three Sum
('b0000000-0000-0000-0000-000000000004', 'nums = [-1,0,1,2,-1,-4]', '[[-1,-1,2],[-1,0,1]]', 'nums[0] + nums[1] + nums[2] = (-1) + 0 + 1 = 0. nums[1] + nums[2] + nums[4] = 0 + 1 + (-1) = 0. nums[0] + nums[3] + nums[4] = (-1) + 2 + (-1) = 0. The distinct triplets are [-1,0,1] and [-1,-1,2].'),
('b0000000-0000-0000-0000-000000000004', 'nums = [0,1,1]', '[]', 'The only possible triplet does not sum up to 0.'),

-- Group Anagrams
('b0000000-0000-0000-0000-000000000005', 'strs = ["eat","tea","tan","ate","nat","bat"]', '[["bat"],["nat","tan"],["ate","eat","tea"]]', NULL),
('b0000000-0000-0000-0000-000000000005', 'strs = [""]', '[[""]]', NULL),

-- Product of Array Except Self
('b0000000-0000-0000-0000-000000000006', 'nums = [1,2,3,4]', '[24,12,8,6]', NULL),
('b0000000-0000-0000-0000-000000000006', 'nums = [-1,1,0,-3,3]', '[0,0,9,0,0]', NULL),

-- Top K Frequent Elements
('b0000000-0000-0000-0000-000000000007', 'nums = [1,1,1,2,2,3], k = 2', '[1,2]', NULL),
('b0000000-0000-0000-0000-000000000007', 'nums = [1], k = 1', '[1]', NULL),

-- Binary Tree Level Order Traversal
('b0000000-0000-0000-0000-000000000008', 'root = [3,9,20,null,null,15,7]', '[[3],[9,20],[15,7]]', NULL),
('b0000000-0000-0000-0000-000000000008', 'root = [1]', '[[1]]', NULL),

-- Validate Binary Search Tree
('b0000000-0000-0000-0000-000000000009', 'root = [2,1,3]', 'true', NULL),
('b0000000-0000-0000-0000-000000000009', 'root = [5,1,4,null,null,3,6]', 'false', 'The root node value is 5 but its right child value is 4.'),

-- Number of Islands
('b0000000-0000-0000-0000-000000000010', 'grid = [["1","1","1","1","0"],["1","1","0","1","0"],["1","1","0","0","0"],["0","0","0","0","0"]]', '1', NULL),
('b0000000-0000-0000-0000-000000000010', 'grid = [["1","1","0","0","0"],["1","1","0","0","0"],["0","0","1","0","0"],["0","0","0","1","1"]]', '3', NULL),

-- Course Schedule
('b0000000-0000-0000-0000-000000000011', 'numCourses = 2, prerequisites = [[1,0]]', 'true', 'There are 2 courses. To take course 1 you should have finished course 0. So it is possible.'),
('b0000000-0000-0000-0000-000000000011', 'numCourses = 2, prerequisites = [[1,0],[0,1]]', 'false', 'There is a cycle.'),

-- Coin Change
('b0000000-0000-0000-0000-000000000012', 'coins = [1,5,10,25], amount = 30', '2', 'Use one 5-cent and one 25-cent coin.'),
('b0000000-0000-0000-0000-000000000012', 'coins = [2], amount = 3', '-1', 'Amount 3 cannot be made from coins of value 2.'),

-- Rotate Image
('b0000000-0000-0000-0000-000000000013', 'matrix = [[1,2,3],[4,5,6],[7,8,9]]', '[[7,4,1],[8,5,2],[9,6,3]]', NULL),
('b0000000-0000-0000-0000-000000000013', 'matrix = [[5,1,9,11],[2,4,8,10],[13,3,6,7],[15,14,12,16]]', '[[15,13,2,5],[14,3,4,1],[12,6,8,9],[16,7,10,11]]', NULL),

-- Search in Rotated Sorted Array
('b0000000-0000-0000-0000-000000000014', 'nums = [4,5,6,7,0,1,2], target = 0', '4', NULL),
('b0000000-0000-0000-0000-000000000014', 'nums = [4,5,6,7,0,1,2], target = 3', '-1', NULL),

-- Word Break
('b0000000-0000-0000-0000-000000000015', 's = "leetcode", wordDict = ["leet","code"]', 'true', 'Return true because "leetcode" can be segmented as "leet code".'),
('b0000000-0000-0000-0000-000000000015', 's = "catsandog", wordDict = ["cats","dog","sand","and","cat"]', 'false', NULL),

-- Longest Palindromic Substring
('b0000000-0000-0000-0000-000000000016', 's = "babad"', '"bab"', '"aba" is also a valid answer.'),
('b0000000-0000-0000-0000-000000000016', 's = "cbbd"', '"bb"', NULL),

-- Letter Combinations of a Phone Number
('b0000000-0000-0000-0000-000000000017', 'digits = "23"', '["ad","ae","af","bd","be","bf","cd","ce","cf"]', NULL),
('b0000000-0000-0000-0000-000000000017', 'digits = ""', '[]', NULL),

-- Median of Two Sorted Arrays
('c0000000-0000-0000-0000-000000000001', 'nums1 = [1,3], nums2 = [2]', '2.0', 'The merged array is [1,2,3] and the median is 2.'),
('c0000000-0000-0000-0000-000000000001', 'nums1 = [1,2], nums2 = [3,4]', '2.5', 'The merged array is [1,2,3,4] and the median is (2 + 3) / 2 = 2.5.'),

-- Regular Expression Matching
('c0000000-0000-0000-0000-000000000002', 's = "aa", p = "a"', 'false', 'The pattern "a" does not match the entire string "aa".'),
('c0000000-0000-0000-0000-000000000002', 's = "aa", p = "a*"', 'true', '"*" means zero or more of the preceding element, "a". Therefore, by repeating "a" once, it becomes "aa".'),

-- Merge K Sorted Lists
('c0000000-0000-0000-0000-000000000003', 'lists = [[1,4,5],[1,3,4],[2,6]]', '[1,1,2,3,4,4,5,6]', NULL),
('c0000000-0000-0000-0000-000000000003', 'lists = []', '[]', NULL),

-- Trapping Rain Water
('c0000000-0000-0000-0000-000000000004', 'height = [0,1,0,2,1,0,1,3,2,1,2,1]', '6', NULL),
('c0000000-0000-0000-0000-000000000004', 'height = [4,2,0,3,2,5]', '9', NULL),

-- N-Queens
('c0000000-0000-0000-0000-000000000005', 'n = 4', '[[".Q..","...Q","Q...","..Q."],["..Q.","Q...","...Q",".Q.."]]', NULL),
('c0000000-0000-0000-0000-000000000005', 'n = 1', '[["Q"]]', NULL),

-- Word Ladder
('c0000000-0000-0000-0000-000000000006', 'beginWord = "hit", endWord = "cog", wordList = ["hot","dot","dog","lot","log","cog"]', '5', 'hit -> hot -> dot -> dog -> cog'),
('c0000000-0000-0000-0000-000000000006', 'beginWord = "hit", endWord = "cog", wordList = ["hot","dot","dog","lot","log"]', '0', 'The endWord "cog" is not in wordList.'),

-- Minimum Window Substring
('c0000000-0000-0000-0000-000000000007', 's = "ADOBECODEBANC", t = "ABC"', '"BANC"', NULL),
('c0000000-0000-0000-0000-000000000007', 's = "a", t = "a"', '"a"', NULL),

-- Serialize and Deserialize Binary Tree
('c0000000-0000-0000-0000-000000000008', 'root = [1,2,3,null,null,4,5]', '[1,2,3,null,null,4,5]', NULL),
('c0000000-0000-0000-0000-000000000008', 'root = []', '[]', NULL),

-- Longest Increasing Path in a Matrix
('c0000000-0000-0000-0000-000000000009', 'matrix = [[9,9,4],[6,6,8],[2,1,1]]', '4', 'The longest increasing path is [1, 2, 6, 9].'),
('c0000000-0000-0000-0000-000000000009', 'matrix = [[3,4,5],[3,2,6],[2,2,1]]', '4', 'The longest increasing path is [3, 4, 5, 6].'),

-- LRU Cache
('c0000000-0000-0000-0000-000000000010', '["LRUCache","put","put","get","put","get","put","get","get","get"]\n[[2],[1,1],[2,2],[1],[3,3],[2],[4,4],[1],[3],[4]]', '[null,null,null,1,null,-1,null,-1,3,4]', NULL),

-- Alien Dictionary
('c0000000-0000-0000-0000-000000000011', 'words = ["wrt","wrf","er","ett","rftt"]', '"wertf"', NULL),
('c0000000-0000-0000-0000-000000000011', 'words = ["z","x"]', '"zx"', NULL),

-- Edit Distance
('c0000000-0000-0000-0000-000000000012', 'word1 = "horse", word2 = "ros"', '3', 'horse -> rorse -> rose -> ros'),
('c0000000-0000-0000-0000-000000000012', 'word1 = "intention", word2 = "execution"', '5', NULL),

-- Find Median from Data Stream
('c0000000-0000-0000-0000-000000000013', '["MedianFinder","addNum","addNum","findMedian","addNum","findMedian"]\n[[],[1],[2],[],[3],[]]', '[null,null,null,1.5,null,2.0]', NULL),

-- Burst Balloons
('c0000000-0000-0000-0000-000000000014', 'nums = [3,1,5,8]', '167', 'Burst in order: 1, 5, 3, 8 → 3*1*5 + 3*5*8 + 1*3*8 + 1*8*1 = 167.'),
('c0000000-0000-0000-0000-000000000014', 'nums = [1,5]', '10', NULL),

-- Longest Valid Parentheses
('c0000000-0000-0000-0000-000000000015', 's = "(()"', '2', 'The longest valid parentheses substring is "()".'),
('c0000000-0000-0000-0000-000000000015', 's = ")()())"', '4', 'The longest valid parentheses substring is "()()".'),

-- Sliding Window Maximum
('c0000000-0000-0000-0000-000000000016', 'nums = [1,3,-1,-3,5,3,6,7], k = 3', '[3,3,5,5,6,7]', NULL),
('c0000000-0000-0000-0000-000000000016', 'nums = [1], k = 1', '[1]', NULL);
