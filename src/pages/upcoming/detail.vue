<template>
  <div class="container">
    <popup-header title="员工月度考核评分" left-text="返回" @on-click-left="routerGoBack" />
    <div class="content">
      <div class="wrap-title">
        一、专业知识(30%)
      </div>
      <div class="warp-question">
        <div class="stars">
          <rater :disabled="true" v-model="professionalKnowledge.star" :max="4" active-color="#04BE02"/>
        </div>
        <div class="text">
          {{ professionalKnowledge.content }}
        </div>
        <div class="score">
          分数:{{ professionalKnowledge.score }}
        </div>
        <div class="process">
          <range v-model="professionalKnowledge.score" :step="1" :min="0" :max="30" @on-change="professionalKnowledgeEvent"/>
        </div>
      </div>
    </div>
    <div class="content">
      <div class="wrap-title">
        二、创新能力(20%)
      </div>
      <div class="warp-question">
        <div class="stars">
          <rater :disabled="true" v-model="creativity.star" :max="4" active-color="#04BE02"/>
        </div>
        <div class="text">
          {{ creativity.content }}
        </div>
        <div class="score">
          分数:{{ creativity.score }}
        </div>
        <div class="process">
          <range v-model="creativity.score" :step="1" :min="0" :max="20" @on-change="creativityEvent"/>
        </div>
      </div>
    </div>
    <div class="content">
      <div class="wrap-title">
        三、团队协作(20%)
      </div>
      <div class="warp-question">
        <div class="stars">
          <rater :disabled="true" v-model="teamCooperation.star" :max="4" active-color="#04BE02"/>
        </div>
        <div class="text">
          {{ teamCooperation.content }}
        </div>
        <div class="score">
          分数:{{ teamCooperation.score }}
        </div>
        <div class="process">
          <range v-model="teamCooperation.score" :step="1" :min="0" :max="20" @on-change="teamCooperationEvent"/>
        </div>
      </div>
    </div>
    <div class="content">
      <div class="wrap-title">
        四、工作态度(20%)
      </div>
      <div class="warp-question">
        <div class="stars">
          <rater :disabled="true" v-model="workAttitude.star" :max="4" active-color="#04BE02"/>
        </div>
        <div class="text">
          {{ workAttitude.content }}
        </div>
        <div class="score">
          分数:{{ workAttitude.score }}
        </div>
        <div class="process">
          <range v-model="workAttitude.score" :step="1" :min="0" :max="20" @on-change="workAttitudeEvent"/>
        </div>
      </div>
    </div>
    <div class="content">
      <div class="wrap-title">
        五、服务(10%)
      </div>
      <div class="warp-question">
        <div class="stars">
          <rater :disabled="true" v-model="service.star" :max="4" active-color="#04BE02"/>
        </div>
        <div class="text">
          {{ service.content }}
        </div>
        <div class="score">
          分数:{{ service.score }}
        </div>
        <div class="process">
          <range v-model="service.score" :step="1" :min="0" :max="10" @on-change="serviceEvent"/>
        </div>
      </div>
    </div>
    <div class="content">
      <div class="wrap-title">
        五、工作完成度(60分)
      </div>
      <div class="warp-question">
        <div class="inside">
          <inline-x-number :min="0" :max="60" :fillable="true" v-model="workCompletion" width="120px"/>
        </div>
      </div>
    </div>
    <div class="content">
      <div class="wrap-title">
        总分
      </div>
      <div class="warp-question">
        <div class="score">
          自评总分:{{ selfScore }}
        </div>
        <div class="inside">
          <x-button type="primary" size="large" >确认提交</x-button>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
// import api from '@/api'
import { Rater, Group, Cell, Range, PopupHeader, InlineXNumber, XButton } from 'vux'
export default {
  name: 'UpcomingDeatil',
  components: {
    PopupHeader,
    Rater,
    Group,
    Cell,
    Range,
    InlineXNumber,
    XButton
  },
  data () {
    return {
      professionalKnowledge: {
        score: 0,
        content: '专业知识非常欠缺，解决岗位问题非常吃力，且不愿学习。',
        star: 1
      },
      creativity: {
        score: 0,
        content: '工作按部就班，墨守成规，几乎从不改进本职工作。',
        star: 1
      },
      teamCooperation: {
        score: 0,
        content: '不能与他人很好合作，独断专行，拉帮结派，内外部顾客时有投诉。',
        star: 1
      },
      workAttitude: {
        score: 0,
        content: '工作责任心不强，工作常常处于应付状态，从不主动承担本职工作。',
        star: 1
      },
      service: {
        score: 0,
        content: '服务意识及服务质量一般，客户满意度较低。',
        star: 1
      },
      workCompletion: 0,
      user: {},
      upcomingDeatil: []

    }
  },
  computed: {
    selfScore () {
      return parseFloat((this.professionalKnowledge.score + this.creativity.score + this.teamCooperation.score + this.workAttitude.score + this.service.score) * 0.4 + this.workCompletion).toFixed(1)
    }
  },
  mounted () {
    document.title = '待办提醒'
  },
  methods: {
    professionalKnowledgeEvent (value) {
      const _this = this
      if (value <= 7) {
        _this.professionalKnowledge.content = '专业知识非常欠缺，解决岗位问题非常吃力，且不愿学习。'
        _this.professionalKnowledge.star = 1
      } else if (value >= 8 && value <= 15) {
        _this.professionalKnowledge.content = '专业知识模糊、不深刻，知识面不宽，经常求助于他人和书本方能解决问题。'
        _this.professionalKnowledge.star = 2
      } else if (value >= 16 && value <= 23) {
        _this.professionalKnowledge.content = '专业知识有一定的深度和广度，能够解决大部分问题，极少求助。'
        _this.professionalKnowledge.star = 3
      } else {
        _this.professionalKnowledge.content = '专业知识具有很高的深度和广度，能够比较顺利的解决并帮助他人解决一些复杂问题。'
        _this.professionalKnowledge.star = 4
      }
    },
    creativityEvent (value) {
      const _this = this
      if (value <= 5) {
        _this.creativity.content = '工作按部就班，墨守成规，几乎从不改进本职工作。'
        _this.creativity.star = 1
      } else if (value >= 6 && value <= 10) {
        _this.creativity.content = '偶尔能发现工作中的瓶颈，有时候能够加以改进。'
        _this.creativity.star = 2
      } else if (value >= 11 && value <= 15) {
        _this.creativity.content = '能发现工作中的瓶颈，大部分时候能找出有效的解决方案，加以改进。'
        _this.creativity.star = 3
      } else {
        _this.creativity.content = '善于发现本单位工作中的瓶颈，并且总是能找出有效的解决方案，加以改进。'
        _this.creativity.star = 4
      }
    },
    teamCooperationEvent (value) {
      const _this = this
      if (value <= 5) {
        _this.teamCooperation.content = '不能与他人很好合作，独断专行，拉帮结派，内外部顾客时有投诉。'
        _this.teamCooperation.star = 1
      } else if (value >= 6 && value <= 10) {
        _this.teamCooperation.content = '团队合作精神不强，经常从自我的角度提供服务，对工作有不良影响。'
        _this.teamCooperation.star = 2
      } else if (value >= 11 && value <= 15) {
        _this.teamCooperation.content = '能够与他人合作共事，相互支持，能够解决团队冲突与矛盾，保证团队任务的完成。'
        _this.teamCooperation.star = 3
      } else {
        _this.teamCooperation.content = '善于与他人合作共事，相互支持，充分发挥各自的优势，巧妙的解决团队冲突。'
        _this.teamCooperation.star = 4
      }
    },
    workAttitudeEvent (value) {
      const _this = this
      if (value <= 5) {
        _this.workAttitude.content = '工作责任心不强，工作常常处于应付状态，从不主动承担本职工作。'
        _this.workAttitude.star = 1
      } else if (value >= 6 && value <= 10) {
        _this.workAttitude.content = '有一定的责任心，有时能够承担一些额外工作，顾客反应良好。'
        _this.workAttitude.star = 2
      } else if (value >= 11 && value <= 15) {
        _this.workAttitude.content = '较强的责任心，主动承担一些额外工作，顾客满意度较高。'
        _this.workAttitude.star = 3
      } else {
        _this.workAttitude.content = '强烈的责任心，非常高的主动性和积极性，服务内外部顾客热情高效，满意度非常高。'
        _this.workAttitude.star = 4
      }
    },
    serviceEvent (value) {
      const _this = this
      if (value <= 2) {
        _this.service.content = '服务意识及服务质量一般，客户满意度较低。'
        _this.service.star = 1
      } else if (value >= 3 && value <= 5) {
        _this.service.content = '经常按时为内外客户提供服务，基本符合客户要求，顾客偶有投诉。'
        _this.service.star = 2
      } else if (value >= 6 && value <= 8) {
        _this.service.content = '经常为内外客户提供各种服务，有较强的客户意识，客户满意度较高。'
        _this.service.star = 3
      } else {
        _this.service.content = '积极为内外客户提供各种服务，站在客户角度思考问题，客户满意度很高。'
        _this.service.star = 4
      }
    },
    fetchData () {

    },
    routerGoBack () {
      this.$router.go(-1)
    }
  }
}
</script>
<style lang='less'>
.content{
 margin:10px 20px;
 margin-bottom:30px;
  .wrap-title{
    color:#2b2a2a;
    position: relative;
    &::before{
        content: " ";
        position: absolute;
        left: 0;
        bottom: -5px;
        right: 0;
        height: 1px;
        border-top: 1px solid #D9D9D9;
        color: #D9D9D9;
        transform-origin: 0 0;
        transform: scaleY(0.5);
    }
  }
  .warp-question{
      margin:10px 0;
      .stars{
        text-align: center;
      }
      .text{
        padding:10px 0;
        text-align: justify;
        word-wrap:break-word;
        height: 60px;
      }
      .score{
        padding:10px 0;
        text-align: center;
        word-wrap:break-word;
        color:#cc180b;
        font-weight:bold;
      }
      .process{
        padding:10px 0;
        text-align: justify;
      }
      .inside{
         text-align: center;
         margin-top:20px;
      }
  }
}

</style>
