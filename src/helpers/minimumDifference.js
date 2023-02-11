export const minimumDifference = (nums) => {
  let mid = Math.floor(nums.length / 2);
  let firstHalf = nums.slice(0, mid),
    secondHalf = nums.slice(mid);
  let firstHalfSum = firstHalf.reduce((a, c) => a + c);
  let secondHalfSum = secondHalf.reduce((a, c) => a + c);

  function sumK(arr, set, idx, sum, k) {
    if (k === 0) return set.add(sum);
    if (idx === arr.length) return;

    sumK(arr, set, idx + 1, sum, k);
    sumK(arr, set, idx + 1, sum + arr[idx], k - 1);
  }

  function populateArray(dp, arr, isFirstArray) {
    for (let i = 1; i <= arr.length; i++) {
      let set = new Set();
      sumK(arr, set, 0, 0, i);
      set = [...set.values()];
      if (!isFirstArray) {
        set.sort((a, b) => a - b);
      }
      dp[i] = set;
    }
  }

  let firstDP = [[0]],
    secondDP = [[0]];
  populateArray(firstDP, firstHalf, true);
  populateArray(secondDP, secondHalf, false);

  let min = Infinity;
  for (let i = 1; i < firstDP.length; i++) {
    for (let num1 of firstDP[i]) {
      let remainingNum1 = firstHalfSum - num1;
      let remainingSubsetLen = secondHalf.length - i;

      let l = 0,
        r = secondDP[remainingSubsetLen].length - 1;
      while (l <= r) {
        let mid = l + Math.floor((r - l) / 2);
        let num2 = secondDP[remainingSubsetLen][mid];
        let remainingNum2 = secondHalfSum - num2;
        let arr1Sum = num1 + num2,
          arr2Sum = remainingNum1 + remainingNum2;
        if (arr1Sum === arr2Sum) return 0;

        min = Math.min(min, Math.abs(arr1Sum - arr2Sum));
        if (arr1Sum > arr2Sum) r = mid - 1;
        else l = mid + 1;
      }
    }
  }
  return min;
};
