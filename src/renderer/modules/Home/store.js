const MODEL_NAME = "report";

var MAX_COUNT = 100;

export default {
  save(model) {
    return $db.save(MODEL_NAME, model).then((res) => {
      return Promise.resolve()
        .then(() => {
          if (!model._id) {
            //删除历史
            return this.list().then((list) => {
              if (list && list.length > MAX_COUNT) {
                return this.remove({
                  _id: {
                    $in: list
                      .filter((item, i) => i >= MAX_COUNT)
                      .map((item) => item._id),
                  },
                });
              }
            });
          }
        })
        .then(() => {
          return res;
        });
    });
  },
  list(keyword) {
    var query = query || {};
    if (!!keyword) {
      query.$where = function() {
        var self = this;
        if(self.gzrrq){
          return self.gzrrq.indexOf(keyword) >= 0;
        }
        return false;
      };
    }
    return $db.find(MODEL_NAME, query, { createTime: -1 });
  },
  remove(model) {
    return $db.remove(MODEL_NAME, model);
  },
};
