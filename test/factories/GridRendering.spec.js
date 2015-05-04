/// <reference path="../../typings/jasmine/jasmine.d.ts"/>
/* global inject */

describe('GridRendering', function () {
  beforeEach(module('widgetGrid'));
  
  var GridRendering, Grid, Widget;
  var minGrid, medGrid;
  
  beforeEach(inject(function (_GridRendering_, _Grid_, _Widget_) {
    GridRendering = _GridRendering_;
    Grid = _Grid_;
    Widget = _Widget_;
    
    minGrid = new Grid({ columns: 1, rows: 1 });
    medGrid = new Grid({ columns: 12, rows: 8 });
  }));
  
  describe('#getWidgetIdAt', function () {
    it('returns the respective widget when the coords hit one, else null', function () {
      var p1 = { top: 0, height: 4, left: 0, width: 5 };
      var p2 = { top: 4, height: 4, left: 5, width: 7 };
      var w1 = new Widget(p1);
      var w2 = new Widget(p2);
      medGrid.add(w1);
      medGrid.add(w2);
      
      var render = {};
      render[w1.id] = p1;
      render[w2.id] = p2;
      
      var rendering = new GridRendering(medGrid, render);
      
      expect(rendering.getWidgetIdAt(0, 0)).toEqual(w1.id);
      expect(rendering.getWidgetIdAt(3, 4)).toEqual(w1.id);
      expect(rendering.getWidgetIdAt(4, 5)).toEqual(w2.id);
      expect(rendering.getWidgetIdAt(5, 7)).toEqual(w2.id);
      expect(rendering.getWidgetIdAt(7, 11)).toEqual(w2.id);
      
      expect(rendering.getWidgetIdAt(3, 5)).toBeNull;
      expect(rendering.getWidgetIdAt(3, 11)).toBeNull;
      expect(rendering.getWidgetIdAt(4, 4)).toBeNull;
      expect(rendering.getWidgetIdAt(6, 2)).toBeNull;
      
      rendering = new GridRendering(minGrid, []);
      expect(rendering.getWidgetIdAt(0, 0)).toBeNull;
    });
    
    it('considers the renderedPositions, if they differ from the original ones', function () {
      var p1 = { top: 0, height: 4, left: 0, width: 5 };
      var p1Rendered = { top: 4, height: 4, left: 5, width: 7 };
      var w1 = new Widget(p1);
      medGrid.add(w1);
      
      var render = {};
      render[w1.id] = p1Rendered;
      
      var rendering = new GridRendering(medGrid, render);
      
      expect(rendering.getWidgetIdAt(0, 0)).toBeNull;
      expect(rendering.getWidgetIdAt(3, 4)).toBeNull;
      expect(rendering.getWidgetIdAt(4, 5)).toEqual(w1.id);
      expect(rendering.getWidgetIdAt(7, 11)).toEqual(w1.id);    
    });
  });
  
  describe('#isObstructed', function () {
    it('returns true when the coords hit a widget, else false', function () {
      var p1 = { top: 0, height: 4, left: 0, width: 5 };
      var p2 = { top: 4, height: 4, left: 5, width: 7 };
      var w1 = new Widget(p1);
      var w2 = new Widget(p2);
      medGrid.add(w1);
      medGrid.add(w2);
      
      var render = {};
      render[w1.id] = p1;
      render[w2.id] = p2;
      
      var rendering = new GridRendering(medGrid, render);
      expect(rendering.isObstructed(0, 0)).toEqual(true);
      expect(rendering.isObstructed(3, 4)).toEqual(true);
      expect(rendering.isObstructed(4, 5)).toEqual(true);
      expect(rendering.isObstructed(5, 7)).toEqual(true);
      expect(rendering.isObstructed(7, 11)).toEqual(true);
      
      expect(rendering.isObstructed(3, 5)).toEqual(false);
      expect(rendering.isObstructed(3, 11)).toEqual(false);
      expect(rendering.isObstructed(4, 4)).toEqual(false);
      expect(rendering.isObstructed(6, 2)).toEqual(false);
      
      rendering = new GridRendering(minGrid, {});
      expect(rendering.isObstructed(0, 0)).toEqual(false);
    });
    
    it('returns true when coords are not within the left, top, and/or right bounds of the grid', function () {
      var rendering = new GridRendering(medGrid, {});
      expect(rendering.isObstructed(8, 4)).toEqual(false);
      expect(rendering.isObstructed(3, 12)).toEqual(true);
      expect(rendering.isObstructed(-1, 4)).toEqual(true);
      expect(rendering.isObstructed(4, -1)).toEqual(true);
    });
  });
  
  describe('#getWidgetStyle', function () {
    xit('returns sane percentage values when passed sane data', function () {
      
    });
  });
});