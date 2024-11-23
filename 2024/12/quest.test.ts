import { describe, expect, test } from 'vitest'

type Loc = { r: number, c: number }

function calculateDest({ r, c }: Loc, world: string[][], power: number, target: Loc): { hit: Loc, locAboveTarget: Loc | null } {

	let locAboveTarget = null

	let r1 = r;
	let c1 = c;
	for (let p = 0; p < power; p++) {
		if (c1 === target.c && r1 < target.r) locAboveTarget = { r: r1, c: c1 }
		r1--
		c1++
	}
	//const r1 = r - power;
	//const c1 = c + power;

	const r2 = r1;
	//let c2 = c1 + power;
	let c2 = c1;
	for (let p = 0; p < power; p++) {
		if (c2 === target.c && r2 < target.r) locAboveTarget = { r: r2, c: c2 }
		c2++
	}


	let r3 = r2;
	let c3 = c2;
	while (world[r3]?.[c3] !== 'T' && world[r3]?.[c3] !== 'H' && r3 !== world.length - 1) {
		if (c3 === target.c && r3 < target.r) locAboveTarget = { r: r3, c: c3 }
		r3++;
		c3++;
	}

	// const height = groundR - r2;

	// const r3 = r2 + height;
	// const c3 = c2 + height;

	return {
		hit: { r: r3, c: c3 },
		locAboveTarget
	}

}

function drawHit(world: string[][], loc: Loc) {
	const prev = world[loc.r][loc.c]
	world[loc.r][loc.c] = 'X'
	//console.log(loc)
	//console.log(world.map(l => l.join('')).join('\n'))
	world[loc.r][loc.c] = prev
}

function solveQuest(notes: string) {
	const world = notes.split('\n').map(l => [...l]);
	const launchers: Loc[] = [];
	const targets: (Loc & { h: number })[] = [];
	for (let r = 0; r < world.length; r++) {
		for (let c = 0; c < world[0].length; c++) {
			const char = world[r][c];
			if (char >= 'A' && char <= 'Z') {
				if (char === 'T') targets.push({ r, c, h: 1 })
				else if (char === 'H') targets.push({ r, c, h: 2 })
				else launchers.push({ r, c })
			}
		}
	}

	targets.sort((a, b) => {
		const cDiff = a.c - a.c;
		if (cDiff) return cDiff
		const rDiff = a.r - b.r;
		if (rDiff) return rDiff;
		return 0
	});
	launchers.sort((a, b) => {
		return a.r - b.r;
	})

	const doubleTargets = targets.filter(t => t.h === 2)

	let hits = []
	for (let t = 0; t < targets.length; t++) {
		const dest = targets[t];
		let targetHit = false;
		for (let l = 0; l < launchers.length; l++) {
			if (targetHit) break
			const origin = launchers[l]
			for (let power = 1; true; power++) {
				const { hit, locAboveTarget } = calculateDest(origin, world, power, dest)
				drawHit(world, hit)
				if (hit.r === dest.r && hit.c === dest.c) {
					hits.push({ power, segment: world[origin.r][origin.c] })
					if (dest.h === 2) hits.push(hits.at(-1))
					targetHit = true;
					break
				}
				if (locAboveTarget) {
					break
				}
			}
		}
		if (targetHit) {
			world[dest.r][dest.c] = 'O'
		} else {
			console.log('not hit')
		}
	}

	return hits.reduce((a, b) => a + ((b.segment.charCodeAt(0) - 'A'.charCodeAt(0) + 1) * b.power), 0)
}

function solveQuest3(notes: string) {
	let meteors = notes.split('\n').map(l => {
		const [x, y] = l.split(' ').map(Number)
		return { detected: { x, y }, x, y } as {
			detected: { x, y },
			x: number,
			y: number,
			best?: number
		}
	});
	const launchers = [{ x: 0, y: 0, segment: 'A' }, { x: 0, y: 1, segment: 'B' }, { x: 0, y: 2, segment: 'C' }]

	const maxPower = Math.ceil(Math.max(...meteors.map(m => m.x)) / 2)

	function visualizeProjectile(launchers, projectile, meteors) {
		return
		if (projectile.segment === 'C' && projectile.power === 1) {
			const maxXProjectile = Math.max(...projectile.history.map(h => h.x), ...meteors.map(m => m.x))
			const maxYProjectile = Math.max(...projectile.history.map(h => h.y), ...meteors.map(m => m.y))
			const maxX = maxXProjectile * 2;
			const maxY = maxYProjectile * 2;

			const world = [];
			for (let y = maxY; y >= -1; y--) {
				let line = []
				for (let x = -1; x <= maxX; x++) {
					if (y === -1) {
						line.push('=')
						continue
					}
					const launcher = launchers.find(l => l.x === x && l.y === y)
					if (launcher) {
						line.push(launcher.segment)
						continue
					}

					const smoke = projectile.history.find(h => h.x === x && h.y === y)
					if (smoke) {
						line.push('p')
						continue
					}
					if (projectile.x === x && projectile.y === y) {
						line.push('P')
						continue
					}
					const meteor = meteors.find(m => m.x === x && m.y === y)
					if (meteor) {
						line.push('M')
						continue
					}

					line.push('.')
				}
				world.push(line.join(''))
			}
			const worldStr = world.join('\n')
			console.clear()
			console.log(worldStr)
		}
	}

	const collisionRankingScores = {}
	let projectiles = [];
	let total = 0
	for (let time = 0; meteors.length; time++) {
		for (const projectile of projectiles) {
			projectile.history.push({ x: projectile.x, y: projectile.y })
			if (projectile.rights) {
				projectile.rights--;
			} else {
				projectile.y--
			}
			projectile.x++;
		}
		projectiles = projectiles.filter(projectile => projectile.y !== -1);
		const power = time + 1
		for (const launcher of launchers) {
			projectiles.push({
				x: launcher.x + power,
				y: launcher.y + power,
				rights: power,
				power: power,
				segment: launcher.segment,
				history: []
			})
		}
		for (const projectile of projectiles) {
			const key = projectile.x + "|" + projectile.y
			if (!(key in collisionRankingScores)) collisionRankingScores[key] = []
			collisionRankingScores[key].push(((projectile.segment.charCodeAt(0) - 'A'.charCodeAt(0) + 1) * projectile.power))
		}
		for (const meteor of meteors) {
			meteor.y--;
			meteor.x--
			const key = meteor.x + "|" + meteor.y
			const rankingScores = collisionRankingScores[key] ?? []
			if (!rankingScores.length) continue
			const projectilesWithRankingScores = rankingScores.sort((a, b) => a - b);
			meteor.best = projectilesWithRankingScores[0];
			total += meteor.best
		}
		meteors = meteors.filter(meteor => meteor.best === undefined);
		for (const meteor of meteors) {
			if (meteor.x <= 0 || meteor.y < 0) {
				throw new Error(`Missed ${JSON.stringify(meteor.detected)} meteor`)
			}
		}
	}

	return total;
}

describe('Part 1', () => {
	test('Example', () => {
		expect(solveQuest(`.............
.C...........
.B......T....
.A......T.T..
=============`)).toBe(13)
	})

	test('Notes', () => {
		expect(solveQuest(`.................................
.C............T......T.....T.T.T.
.B............T......T.....T.T.T.
.A............T......T.....T.T.T.
=================================`.trim())).toBe(230)
	})
})

describe('Part 2', () => {
	test('Example', () => {
		expect(solveQuest(`.............
.C...........
.B......H....
.A......T.H..
=============`)).toBe(22)
	})

	test('Notes', () => {
		expect(solveQuest(`...................................................................................................
...............................................................................TT..TT..TTT..TT..TT.
...............................................................................TT..TT..TTT..TT..TT.
..............................................................................TTTTTTTTTTTTTTTTTTTTT
...............................................................................TT.TTTTTTTTTTTTTTTT.
...............................................................................TTTTTTTTT.TTTTTTTTT.
...............................................................................TTTTTTTT...TTTTTHTT.
...............................................................................TTTTTTTT...TTTTTHTT.
..............................................................................TTTTTTTTTTTTTTTTTTTTT
...............................................................................TT.THHT.T..TT.H.TTT.
...............................................................................TTTHTTHHHHH.HTT..TT.
...............................................................................TT.H.T.H.TTTHHTH.TT.
...............................................................................TTH.TH.HHHTTHHHHHTT.
...............................................................................TTHHT.T.HT.T...THTT.
...............................................................................TTHHT..HT.HTT.T..TT.
...............................................................................TTT.HTHHT.T.TT.HTTT.
..............................................................................TTTTTTTTTTTTTTTTTTTTT
.C.............................................................................TTTTTTTT...TTTTTHTT.
.B.............................................................................TTTTTTT.....TTTTHTT.
.A.............................................................................TT.TTTT.....TTTTHTT.
===================================================================================================`)).toBe(21153)
	})
})

describe('Part 3', () => {
	describe('Example', () => {
		test('6 7', () => {
			expect(solveQuest3(`6 7`)).toBe(6)
		})
		test('6 5', () => {
			expect(solveQuest3(`6 5`)).toBe(2)
		})
		test('10 5', () => {
			expect(solveQuest3(`10 5`)).toBe(3)
		})
		test('5 5', () => {
			expect(solveQuest3(`5 5`)).toBe(2)
		})
		test('Full', () => {
			expect(solveQuest3(`6 5
				6 7
				10 5`.trim())).toBe(11)
		})
	})

	test('Notes', () => {
		expect(solveQuest3(`3570 2915
3545 3381
3877 2733
3672 2559
3650 3459
3688 2570
3531 2509
3601 3189
3618 3447
3574 3449
3998 3172
3528 3418
3539 3296
3612 3273
3729 2607
3565 2938
3695 2662
3938 3049
3924 3304
3988 2679
3686 2721
3629 3490
3751 3434
3979 3233
3840 2980
3891 3399
3791 3346
3775 2706
3535 3210
3611 3384
3550 2672
3668 2791
3781 3491
3786 2587
3755 2590
3701 2530
3677 3243
3642 2879
3872 2726
3748 2943
3687 3198
3917 3482
3817 2605
3980 3066
3862 3423
3883 2926
3557 2624
3997 3079
3675 2596
3915 2940
3961 3052
3674 3395
3697 3019
3640 2851
3902 2629
3803 2561
3835 3177
3837 3076
3932 3443
3720 2968
3621 2595
3577 2637
3712 2869
3860 3355
3744 2744
3737 3495
3679 2656
3638 2832
3738 2732
3783 3203
3714 2761
3863 3234
3763 3277
3920 3265
3501 3085
10 10
3573 3348
3909 2682
3931 2641
3604 3229
3575 2982
3794 3327
3637 2895
3952 2600
3580 2518
3734 3254
3919 3069
3765 3386
3769 2908
3514 3001
3827 2780
3759 3199
3957 3227
3549 2969
3578 2841
3939 3114
3850 3420
3802 3090
3742 3211
3800 2799
3649 2944
3996 3135
3888 3201
3959 3317
3749 3003
3944 3031
4000 2890
3846 2816
3740 3119
3595 2646
3839 2942
3559 2701
3532 3473
3715 2820
3682 2555
3736 3403
3780 2507
3946 2699
3754 2931
3703 2952
3705 2876
3949 3036
3982 3332
3713 2914
3936 3139
3592 2803
3772 3058
3670 3062
3586 3217
3767 3282
3561 3029
3617 3469
3572 3270
3644 2775
3673 3040
3513 2696
3752 3397
3735 2835
7202 3602
3808 2787
3842 2547
3813 3094
3593 2776
3732 3356
3951 3220
3930 3121
3722 3451
3753 2581
3554 2725
3730 3247
3838 3059
3524 2645
3526 2812
3552 3033
3960 3249
3507 2821
3843 3000
3926 3092
3600 3257
3613 3487
3647 3414
3811 2534
3777 2529
7200 3601
3519 2772
3900 2692
3907 3306
3653 3136
3582 3288
3556 2948
3966 3015
3810 2888
3921 2523
3889 3400
3958 3281
3789 2552
3623 3152
3970 3413
3553 2544
3560 2763
3807 2891
3597 3118
3634 3438
3504 2854
3512 3440
3868 2556
3844 3010
3693 3240
3894 3030
3676 2675
3659 2958
3743 2847
3700 3700
3854 2802
3762 3385
3956 3246
3594 3467
3805 3212
3678 2632
3567 3453
3797 2790
3648 3454
3564 3022
3987 2828
3654 2965
3758 3299
3723 2801
3733 2998
3773 2949
3824 3390
3828 3426
3819 3442
3826 3097
3876 3196
3933 2554
3836 2901
3867 2654
3793 3471
3571 2760
3602 2993
3962 2860
3912 3412
3820 3157
3776 2922
3985 3104
3731 3057
3610 3387
3950 3366
3848 2663
3681 3216
3523 3319
3510 2784
3609 2585
3658 2738
3927 3422
3700 2671
3882 3065
3796 2825
3999 2593
3584 3215
3963 3244
3812 3144
3569 3310
3708 2878
3830 3439
3904 2667
3832 2900
3646 2558
3967 2754
3945 2770
3541 2653
3632 3226
3785 2746
3851 2651
3948 3002
3700 3702
3694 2660
3989 3071
3890 2962
3757 2868
3515 2769
3905 2697
3591 3404
3568 2540
3865 3283
3665 3389
3641 3200
3922 2714
3886 3167
3606 3170
3718 2765
3814 3043
3704 2805
3911 3476
3663 3153
3940 2517
3823 3134
3760 3130
3563 2536
3770 2551
3874 2829
3516 2823
3711 3480
3517 2564
3566 2932
3544 3106
3893 3025
3899 2930
3878 2853
3971 3181
3716 2964
3798 3364
3719 3149
3636 2912
3536 2963
3983 3343
3784 2736
3947 3464
3822 3376
3655 2514
3766 2903
3954 2880
3635 2863
3829 2979
3825 3284
3750 3137
3664 2519
3691 3027
3853 2709
3746 3205
3548 2535
3908 2953
3858 2884
3726 3311
3898 2655
3782 3161
3934 3107
3973 2504
3620 3280
3696 2882
3855 2562
3721 3158
3914 2933
3724 2913
3903 3354
3986 3380
3588 3026
3599 3357
3792 3163
3818 3262
3590 2925
3870 3314
3529 2502
3929 3260
3562 2897
3995 2767
3935 3352
3547 2734
3747 2961
3849 3038
3756 3431
3821 3351
3533 2716
3625 3383
3918 3294
3928 3437
3685 2991
3978 2546
3614 2777
3725 3016
3661 3024
3671 3347
3991 3082
3683 3018
3598 3367
3910 2694
3884 3112
3788 3250
3972 3263
3895 2824
3845 2602
3706 2978
3852 2752
3583 2618
3607 2904
3717 3468
3804 3251
3739 3498
3645 2870
3955 3178
3680 2533
3976 2543
3522 2837
3873 2937
3530 2685
3605 3073
3585 3307
3778 2673
3707 3421
3657 3248
3630 3070
3953 3430
3684 2747
3896 2661
3795 2691
3505 3013
3992 2563
3994 3345
3885 2988
3662 2836
3699 3358
3847 3232
3745 3479
3964 3193
3689 2911
3710 3132
3913 2737
3669 3392
3667 3371
3834 2844
3993 2951
3815 2584
3859 2762
3942 3242
3626 3165
3901 2553
3969 2999
3631 2800
3576 2541
3875 3411
3543 2886
3589 3067
3841 3388
3975 2586
3881 3230
3925 2936
3643 3120
3790 2924
3639 2620
3666 2589
3861 3365
3761 2542
3546 2819
3768 3184
3652 3072
3628 3148
3555 3344
3579 2573
3596 3313
3558 3204
3527 2578
3771 3378
3887 3333
3542 2885
3866 3054
3702 2745
3698 3458
3990 3252
3518 2576
3799 3427
3534 2621
3616 2966
3521 2625
3943 3452
3937 3278
3502 2526
3923 3147
3700 3701
3897 3428
3831 2877
3968 2571
3864 2807
3974 2630
3816 3359
7198 3600
3965 2797
3856 2986
3624 3186
3779 2516
3869 2613
3587 3218
3857 3077
3809 3405
3520 2910
3622 3408
3871 3113
3633 2636
3774 3053
3976 1989
3879 2994
3806 3290
3764 2615
3581 3042
3506 2852
3551 3253
3656 3336
3801 2728
3984 3202
3503 2668
3540 3268
3525 2839
3880 3470
3892 3360
3651 3109
3690 3363
3627 2872
3603 2695
3509 2756
3660 3162
3692 2899
3833 2975
3537 3289
3608 2864
3741 2616
3728 2955
3619 3394
3615 2894
3977 3322
3787 2759
3709 2521
3916 3187
3981 2560`)).toBe(713149)
	})
})
